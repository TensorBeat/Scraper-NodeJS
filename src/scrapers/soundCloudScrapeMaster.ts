import { Scraper } from '../interface/scraper'
import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import { autoScroll, downloadSong } from '../util'
import { Queue } from 'bullmq'
import { logger } from '../logger'
import { SongJobData, SongJobReturn } from '../interface/songJob'

export class SoundCloudScrapeMaster implements Scraper {
    queue: Queue<SongJobData, SongJobReturn>
    constructor(queue: Queue<SongJobData, SongJobReturn>) {
        this.queue = queue
    }

    async scrape(): Promise<void> {
        //TODO: create related tree search
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 600,
                height: 900,
            },
            headless: true,
        })
        const page = await browser.newPage()
        await page.goto(
            'https://soundcloud.com/discover/sets/charts-top:all-music:us',
            {
                waitUntil: 'networkidle2',
            }
        )

        await autoScroll(page)

        const content = await page.content()
        const $ = cheerio.load(content)

        const songUrls: string[] = []
        $('.trackItem__content > .trackItem__trackTitle').each((i, el) => {
            const songPostfix = $(el).attr('href')
            const songUrl = `https://soundcloud.com${songPostfix}`
            songUrls.push(songUrl)
        })

        for (let i = 0; i < songUrls.length; i++) {
            const songUrl = songUrls[i]
            logger.info(`Sent to queue: ${songUrl}`)
            await this.queue.add(songUrl, { downloadUrl: songUrl })
        }

        browser.close()
    }
}
