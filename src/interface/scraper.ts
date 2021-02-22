export interface Scraper {
    scrape: () => Promise<void>
}
