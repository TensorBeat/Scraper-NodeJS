export class Config {
    static IS_PRODUCTION = process.env.NODE_ENV == 'production'

    static LOG_LEVEL = process.env.LOG_LEVEL ?? 'info'

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

    static IS_WORKER = process.env.IS_WORKER == 'true'
    static IS_CRAWLER = process.env.IS_CRAWLER == 'true'
    static IS_BOTH = !Config.IS_WORKER && !Config.IS_CRAWLER

    static BUCKET_NAME = Config.IS_PRODUCTION
        ? 'tensorbeat-songs'
        : 'test-tensorbeat-songs'

    static SC_CRAWLER_QUEUE_NAME =
        process.env.SC_CRAWLER_QUEUE_NAME ??
        (Config.IS_PRODUCTION ? 'scraperCrawlQueue' : 'scraperTestCrawlQueue')

    static SC_SEED_CHARTS_URLS: string[] = [
        'https://soundcloud.com/discover/sets/charts-trending:all-music:us',
        'https://soundcloud.com/discover/sets/charts-trending:pop:us',
        'https://soundcloud.com/discover/sets/charts-trending:rbsoul:us',
        'https://soundcloud.com/discover/sets/charts-trending:electronic:us',
        'https://soundcloud.com/discover/sets/charts-trending:rock:us',
        'https://soundcloud.com/discover/sets/charts-top:all-music:us',
        'https://soundcloud.com/discover/sets/charts-top:pop:us',
        'https://soundcloud.com/discover/sets/charts-top:rbsoul:us',
        'https://soundcloud.com/discover/sets/charts-top:world:us',
        'https://soundcloud.com/discover/sets/charts-top:electronic:us',
        'https://soundcloud.com/discover/sets/charts-top:rock:us',
        'https://soundcloud.com/discover/sets/charts-top:latin:us',
        'https://soundcloud.com/discover/sets/charts-top:house:us',
        'https://soundcloud.com/discover/sets/charts-top:country:us',
        'https://soundcloud.com/discover/sets/charts-top:danceedm:us',
        'https://soundcloud.com/discover/sets/charts-top:soundtrack:us',
        'https://soundcloud.com/discover/sets/charts-top:dubstep:us',
        'https://soundcloud.com/discover/sets/charts-top:classical:us',
        'https://soundcloud.com/discover/sets/charts-top:reggae:us',
        'https://soundcloud.com/discover/sets/charts-top:reggaeton:us',
        'https://soundcloud.com/discover/sets/charts-top:folksingersongwriter:us',
        'https://soundcloud.com/discover/sets/charts-top:ambient:us',
        'https://soundcloud.com/discover/sets/charts-top:alternativerock:us',
        'https://soundcloud.com/discover/sets/charts-top:trap:us',
        'https://soundcloud.com/discover/sets/charts-top:dancehall:us',
        'https://soundcloud.com/discover/sets/charts-top:metal:us',
        'https://soundcloud.com/discover/sets/charts-top:indie:us',
        'https://soundcloud.com/discover/sets/charts-top:techno:us',
        'https://soundcloud.com/discover/sets/charts-top:drumbass:us',
        'https://soundcloud.com/discover/sets/charts-top:jazzblues:us',
        'https://soundcloud.com/discover/sets/charts-top:deephouse:us',
        'https://soundcloud.com/discover/sets/charts-top:trance:us',
        'https://soundcloud.com/discover/sets/charts-top:piano:us',
        'https://soundcloud.com/discover/sets/charts-top:disco:us',
        'https://soundcloud.com/discover/sets/charts-top:religionspirituality:us',
        'https://soundcloud.com/discover/sets/charts-top:triphop:us',
    ]
}
