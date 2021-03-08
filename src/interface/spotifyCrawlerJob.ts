export interface SpotifyCrawlerJobData {
    jobType: string
    id: string
    meta: {
        [detail: string]: string | string[]
    }
}

export interface SpotifyCrawlerJobReturn {}
