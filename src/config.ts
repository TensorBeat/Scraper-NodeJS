export class Config {
    static IS_PRODUCTION = process.env.NODE_ENV == 'production'

    static DATALAKE_ADDRESS =
        process.env.DATALAKE_ADDRESS ??
        (Config.IS_PRODUCTION
            ? 'grpc.tensorbeat.com:50051'
            : 'grpc.test.tensorbeat.com:50051')

    static REDIS_HOST = process.env.REDIS_HOST ?? 'redis.tensorbeat.com'
    static REDIS_PORT = parseInt(process.env.REDIS_PORT!) || 6379
    static REDIS_PASSWORD = process.env.REDIS_PASSWORD

    static SONG_QUEUE_NAME =
        process.env.SONG_QUEUE_NAME ??
        (Config.IS_PRODUCTION ? 'scraperSongQueue' : 'scraperTestSongQueue')

    static CRAWL_QUEUE_NAME =
        process.env.CRAWL_QUEUE_NAME ??
        (Config.IS_PRODUCTION ? 'scraperCrawlQueue' : 'scraperTestCrawlQueue')

    static IS_WORKER = process.env.WORKER == 'true'
    static IS_MASTER = process.env.MASTER == 'true'
    static IS_BOTH = !Config.IS_WORKER && !Config.IS_MASTER

    static BUCKET_NAME = Config.IS_PRODUCTION
        ? 'tensorbeat-songs'
        : 'test-tensorbeat-songs'
}
