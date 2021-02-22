import puppeteer from 'puppeteer'
import youtubedl from 'youtube-dl'

export const autoScroll = async (page: puppeteer.Page) => {
    let previousHeight
    while (true) {
        try {
            previousHeight = await page.evaluate('document.body.scrollHeight')
            await page.evaluate(
                'window.scrollTo(0, document.body.scrollHeight)'
            )
            await page.waitForFunction(
                `document.body.scrollHeight > ${previousHeight}`,
                { timeout: 5000 }
            )
        } catch (e) {
            break
        }
    }
}

export async function downloadSong(url: string) {
    const params = [
        // '--write-info-json',
        '--restrict-filenames',
        '--extract-audio',
        '--audio-format',
        'mp3',
        '-o',
        './downloads/%(title)s.%(ext)s',
    ]

    return new Promise<void>((resolve, reject) => {
        youtubedl.exec(url, params, {}, (err, output) => {
            //ignore errors :)
            resolve()
        })
    })
}
