import { Queue } from 'bullmq'
import cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import { Scraper } from '../interface/scraper'
import { SongJobData, SongJobReturn } from '../interface/songJob'
import { logger } from '../logger'
import { Datalake } from '../services/datalake'
import { autoScroll } from '../util'

export class SoundCloudCrawler implements Scraper {
    songQueue: Queue<SongJobData, SongJobReturn>
    browser: puppeteer.Browser | undefined
    datalake: Datalake

    constructor(
        songQueue: Queue<SongJobData, SongJobReturn>,
        datalake: Datalake
    ) {
        this.songQueue = songQueue
        this.datalake = datalake
    }

    async scrape(): Promise<void> {
        this.browser = await puppeteer.launch({
            defaultViewport: {
                width: 1000,
                height: 900,
            },
            headless: true,
        })
        const page = await this.browser.newPage()
        await page.goto(
            'https://soundcloud.com/discover/sets/charts-top:all-music:us',
            {
                waitUntil: 'networkidle2',
            }
        )

        await autoScroll(page)

        const content = await page.content()
        await page.close()
        const $ = cheerio.load(content)

        // Breadth first queue
        const bfQueue: string[] = []

        $('.trackItem__content > .trackItem__trackTitle').each((i, el) => {
            const songPostfix = $(el).attr('href')?.split('?')[0]
            if (songPostfix != null) {
                const songUrl = `https://soundcloud.com${songPostfix}`
                bfQueue.push(songUrl)
            }
        })

        await this.sendSongsToWorkerQueue(bfQueue)

        while (bfQueue.length > 0) {
            const songUrl = bfQueue.shift()!

            /*
            This doesn't account for the delay it takes for a song to go from in queue to datalake 
            but should be fine because worker will check both other active workers and the datalake. 
            
            This will eventually be true for any given song which prevents infinite looping
            */
            const alreadyVisited = await this.datalake.doesSongExist(songUrl)
            if (alreadyVisited) continue

            const relatedUrls = await this.getRelatedSongUrls(songUrl)
            await this.sendSongsToWorkerQueue(relatedUrls)
            bfQueue.push(...relatedUrls)

            logger.info(`${bfQueue.length} songs in crawler queue`)
        }

        this.browser.close()
    }

    private async sendSongsToWorkerQueue(songUrls: string[]) {
        for (let i = 0; i < songUrls.length; i++) {
            const songUrl = songUrls[i]
            logger.info(`Sent to queue: ${songUrl}`)
            await this.songQueue.add(songUrl, { downloadUrl: songUrl })
        }
    }

    async getRelatedSongUrls(songUrl: string): Promise<string[]> {
        if (this.browser == undefined) {
            logger.error("Web browser hasn't been initialized")
            throw new Error("Web browser hasn't been initialized")
        }

        const relatedUrls: string[] = []

        const recommendedUrl = `${songUrl}/recommended`

        const page = await this.browser.newPage()
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
