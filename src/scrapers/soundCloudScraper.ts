import { Scraper } from '../interface/scraper'
import puppeteer from 'puppeteer'
import cheerio from 'cheerio'
import { autoScroll, downloadSong } from '../util'

export class SoundCloudScraper implements Scraper {
    constructor() {}

    async scrape(): Promise<void> {
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
        const songLinks: string[] = []

        $('.trackItem__content > .trackItem__trackTitle').each((i, el) => {
            const songPostfix = $(el).attr('href')
            songLinks.push(`https://soundcloud.com${songPostfix}`)
        })

        const runningDownloads: Promise<void>[] = []

        songLinks.forEach((link) => {
            runningDownloads.push(downloadSong(link))
        })

        await Promise.all(runningDownloads)

        console.log('done')
        browser.close()
    }

    async scrapeMyLikesSmile(): Promise<void> {
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 600,
                height: 900,
            },
            headless: false,
        })
        const page = await browser.newPage()
        await page.goto('https://soundcloud.com/mrthinger/likes', {
            waitUntil: 'networkidle2',
        })

        await autoScroll(page)

        const content = await page.content()
        const $ = cheerio.load(content)
        const songLinks: string[] = []

        $('.soundTitle__usernameTitleContainer > .soundTitle__title').each(
            (i, el) => {
                const songPostfix = $(el).attr('href')
                songLinks.push(`https://soundcloud.com${songPostfix}`)
            }
        )

        const runningDownloads: Promise<void>[] = []

        songLinks.forEach((link) => {
            console.log(`Downloading: ${link}`)
            runningDownloads.push(downloadSong(link))
        })

        await Promise.all(runningDownloads)

        browser.close()
    }
}
