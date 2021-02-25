import { Job, Queue, Worker } from 'bullmq'
import cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import { Config } from '../config'
import { SongJobData, SongJobReturn } from '../interface/songJob'
import {
    SoundCloudCrawlerJobData,
    SoundCloudCrawlerJobReturn,
} from '../interface/soundCloudCrawlerJob'
import { logger } from '../logger'
import { Datalake } from '../services/datalake'
import { autoScroll } from '../util'
import IORedis from 'ioredis'

export class SoundCloudCrawler {
    songQueue: Queue<SongJobData, SongJobReturn>
    browser: Promise<puppeteer.Browser>
    datalake: Datalake
    worker: Worker<SoundCloudCrawlerJobData, SoundCloudCrawlerJobReturn>
    crawlerQueue: Queue<SoundCloudCrawlerJobData, SoundCloudCrawlerJobReturn>

    constructor(
        songQueue: Queue<SongJobData, SongJobReturn>,
        datalake: Datalake,
        redisConnection: IORedis.Redis,
        crawlerQueue: Queue<
            SoundCloudCrawlerJobData,
            SoundCloudCrawlerJobReturn
        >
    ) {
        this.browser = puppeteer.launch({
            defaultViewport: {
                width: 1000,
                height: 900,
            },
            // args needed for linux/docker
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true,
        })

        this.songQueue = songQueue
        this.datalake = datalake

        this.crawlerQueue = crawlerQueue

        this.worker = new Worker<
            SoundCloudCrawlerJobData,
            SoundCloudCrawlerJobReturn
        >(Config.SC_CRAWLER_QUEUE_NAME, this.onJob.bind(this), {
            connection: redisConnection,
        })

        // give crawler queue the opportunity to make first batch of songs varied
        this.worker.pause()
        this.maybeSeedCrawlerQueue().then(() => {
            this.worker.resume()
        })
    }

    close() {
        const browserClose = this.browser.then((browser) => browser.close())
        const workerClose = this.worker.close()
        return Promise.all([browserClose, workerClose])
    }

    async onJob(
        job: Job<SoundCloudCrawlerJobData, SoundCloudCrawlerJobReturn>
    ) {
        const songUrl = job.data.songUrl
        logger.debug(`Start crawling: ${job.data.songUrl}`)

        const relatedUrls = await this.getRelatedSongUrls(songUrl)
        await this.sendSongsToWorkerQueue(relatedUrls)
        await this.sendUrlsToCrawlerQueue(relatedUrls)

        logger.info(
            `Added ${relatedUrls.length} songs from crawling: ${job.data.songUrl}`
        )

        return 'done'
    }

    async maybeSeedCrawlerQueue() {
        const crawlerQueueLength = await this.crawlerQueue.getWaitingCount()
        if (crawlerQueueLength != 0) {
            logger.info(
                `Crawler queue already contains ${crawlerQueueLength} jobs. Skipping seeding!`
            )
            return
        }

        logger.info(`Crawler queue is empty, seeding with charts...`)

        const browser = await this.browser

        for (let i = 0; i < Config.SC_SEED_CHARTS_URLS.length; i++) {
            const chartUrl = Config.SC_SEED_CHARTS_URLS[i]

            logger.debug(`Seeding: ${chartUrl}`)

            const page = await browser.newPage()
            await page.goto(chartUrl, {
                waitUntil: 'networkidle2',
            })

            await autoScroll(page)

            const content = await page.content()
            await page.close()
            const $ = cheerio.load(content)

            const songUrls: string[] = []

            $('.trackItem__content > .trackItem__trackTitle').each((i, el) => {
                const songPostfix = $(el).attr('href')?.split('?')[0]
                if (songPostfix != null) {
                    const songUrl = `https://soundcloud.com${songPostfix}`
                    songUrls.push(songUrl)
                }
            })

            await this.sendSongsToWorkerQueue(songUrls)
            await this.sendUrlsToCrawlerQueue(songUrls)

            logger.info(`Seeded: ${chartUrl}`)
        }

        logger.info(`Done seeding!`)
    }

    private async sendSongsToWorkerQueue(songUrls: string[]) {
        for (let i = 0; i < songUrls.length; i++) {
            const songUrl = songUrls[i]
            logger.debug(`Sent to song worker queue: ${songUrl}`)
            await this.songQueue.add(songUrl, { downloadUrl: songUrl })
        }
    }

    private async sendUrlsToCrawlerQueue(songUrls: string[]) {
        for (let i = 0; i < songUrls.length; i++) {
            const songUrl = songUrls[i]
            logger.debug(`Sent to crawler queue: ${songUrl}`)
            await this.crawlerQueue.add(songUrl, { songUrl: songUrl })
        }
    }

    async getRelatedSongUrls(songUrl: string): Promise<string[]> {
        const relatedUrls: string[] = []

        const recommendedUrl = `${songUrl}/recommended`

        const browser = await this.browser
        const page = await browser.newPage()
        await page.goto(recommendedUrl, {
            waitUntil: 'networkidle2',
        })

        await autoScroll(page)

        const content = await page.content()
        const $ = cheerio.load(content)

        $('a.soundTitle__title[href]').each((i, el) => {
            const songPostfix = $(el).attr('href')?.split('?')[0]
            if (songPostfix != null) {
                const songUrl = `https://soundcloud.com${songPostfix}`
                relatedUrls.push(songUrl)
            }
        })

        await page.close()

        return relatedUrls
    }
}
