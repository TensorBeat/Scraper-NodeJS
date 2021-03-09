export class Config {
    static readonly IS_PRODUCTION = process.env.NODE_ENV == 'production'
    static readonly BULL_BOARD_PORT =
        parseInt(process.env.BULL_BOARD_PORT!) || 8080

    static readonly LOG_LEVEL = process.env.LOG_LEVEL ?? 'info'

    static readonly DATALAKE_ADDRESS =
        process.env.DATALAKE_ADDRESS ??
        (Config.IS_PRODUCTION
            ? 'grpc.tensorbeat.com:50051'
            : 'grpc.test.tensorbeat.com:50051')

    static readonly REDIS_HOST =
        process.env.REDIS_HOST ?? 'redis.tensorbeat.com'
    static readonly REDIS_PORT = parseInt(process.env.REDIS_PORT!) || 6379
    static readonly REDIS_PASSWORD = process.env.REDIS_PASSWORD

    static readonly PROD_SONG_QUEUE_NAME = 'scraperSongQueue'
    static readonly TEST_SONG_QUEUE_NAME = 'scraperTestSongQueue'
    static readonly SONG_QUEUE_NAME =
        process.env.SONG_QUEUE_NAME ??
        (Config.IS_PRODUCTION
            ? Config.PROD_SONG_QUEUE_NAME
            : Config.TEST_SONG_QUEUE_NAME)

    static readonly IS_WORKER = process.env.IS_WORKER == 'true'
    static readonly IS_CRAWLER = process.env.IS_CRAWLER == 'true'
    static readonly IS_BOTH = !Config.IS_WORKER && !Config.IS_CRAWLER

    static readonly CRAWLER_TYPE =
        (process.env.CRAWLER_TYPE && process.env.CRAWLER_TYPE.toLowerCase()) ??
        'soundcloud'

    static readonly SPOTIFY_CRAWLER_QUEUE_NAME =
        process.env.SPOTIFY_CRAWLER_QUEUE_NAME ??
        (Config.IS_PRODUCTION
            ? 'spotifyScraperCrawlQueue'
            : 'spotifyScraperTestCrawlQueue')
    static readonly SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
    static readonly SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

    static readonly BUCKET_NAME = Config.IS_PRODUCTION
        ? 'tensorbeat-songs'
        : 'test-tensorbeat-songs'

    static readonly PROD_SC_CRAWLER_QUEUE_NAME = 'scraperCrawlQueue'
    static readonly TEST_SC_CRAWLER_QUEUE_NAME = 'scraperTestCrawlQueue'
    static readonly SC_CRAWLER_QUEUE_NAME =
        process.env.SC_CRAWLER_QUEUE_NAME ??
        (Config.IS_PRODUCTION
            ? Config.PROD_SC_CRAWLER_QUEUE_NAME
            : Config.TEST_SC_CRAWLER_QUEUE_NAME)

    static readonly PROD_SC_CRAWLER_SEEN_NAME = 'scraperCrawlSeenSet'
    static readonly TEST_SC_CRAWLER_SEEN_NAME = 'scraperTestCrawlSeenSet'
    static readonly SC_CRAWLER_SEEN_NAME =
        process.env.SC_CRAWLER_SEEN_NAME ??
        (Config.IS_PRODUCTION
            ? Config.PROD_SC_CRAWLER_SEEN_NAME
            : Config.TEST_SC_CRAWLER_SEEN_NAME)

    static readonly SC_SEED_CHARTS_URLS: string[] = [
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
