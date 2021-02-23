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
                { timeout: 2500 }
            )
        } catch (e) {
            break
        }
    }
}

export async function downloadSong(
    url: string,
    folderPath: string,
    withInfoJson: boolean
) {
    const params = [
        '--restrict-filenames',
        '--extract-audio',
        '--audio-format',
        'mp3',
        '-o',
        `${folderPath}/%(title)s.%(ext)s`,
    ]

    if (withInfoJson) {
        params.unshift('--write-info-json')
    }

    return new Promise<string[]>((resolve, reject) => {
        youtubedl.exec(url, params, {}, (err, output) => {
            if (err) reject(err)
            resolve(output)
        })
    })
}
