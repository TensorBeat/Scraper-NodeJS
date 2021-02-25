require('dotenv').config()
import { Storage } from '@google-cloud/storage'
import * as grpc from '@grpc/grpc-js'
import { Queue, QueueScheduler } from 'bullmq'
import IORedis from 'ioredis'
import { Config } from './config'
import { DatalakeServiceClient } from './generated/tensorbeat/datalake_grpc_pb'
import { GetAllSongsRequest } from './generated/tensorbeat/datalake_pb'
import { SongJobData, SongJobReturn } from './interface/songJob'
import {
    SoundCloudCrawlerJobData,
    SoundCloudCrawlerJobReturn,
} from './interface/soundCloudCrawlerJob'
import { logger } from './logger'
import { SoundCloudCrawler } from './scrapers/soundCloudCrawler'
import { Datalake } from './services/datalake'
import { SongWorker } from './songWorker'
;(async () => {
    const redisConnection = await makeRedisConnection()
    const datalakeClient = new DatalakeServiceClient(
        Config.DATALAKE_ADDRESS,
        grpc.credentials.createInsecure()
    )
    const datalake = new Datalake(datalakeClient)

    const songQueue = new Queue<SongJobData, SongJobReturn>(
        Config.SONG_QUEUE_NAME,
        {
            connection: redisConnection,
        }
    )
    const crawlerQueue = new Queue<
        SoundCloudCrawlerJobData,
        SoundCloudCrawlerJobReturn
    >(Config.SC_CRAWLER_QUEUE_NAME, {
        connection: redisConnection,
    })

    if (Config.IS_WORKER || Config.IS_BOTH) {
        const storage = new Storage()
        const songBucket = storage.bucket(Config.BUCKET_NAME)
        logger.info(`Uploading songs to: ${Config.BUCKET_NAME}`)
        const worker = new SongWorker(
            datalake,
            redisConnection,
            songBucket,
            songQueue
        )
        process.on('SIGTERM', async () => {
            await worker.close()
        })
    }

    if (Config.IS_CRAWLER || Config.IS_BOTH) {
        const scraper = new SoundCloudCrawler(
            songQueue,
            datalake,
            redisConnection,
            crawlerQueue
        )

        // For now just attach the queue scheduler to the crawler process
        // Queue scheduler passivley manages delayed and stalled jobs
        // https://docs.bullmq.io/guide/queuescheduler
        const songQueueScheduler = new QueueScheduler(Config.SONG_QUEUE_NAME, {
            connection: redisConnection,
        })
        const scQueueScheduler = new QueueScheduler(
            Config.SC_CRAWLER_QUEUE_NAME,
            {
                connection: redisConnection,
            }
        )

        process.on('SIGTERM', async () => {
            await scraper.close()
            await songQueueScheduler.close()
            await scQueueScheduler.close()
        })
    }

    process.on('SIGTERM', () => {
        redisConnection.disconnect()
        datalakeClient.close()
    })
})()

// test
async function testDatalake() {
    const datalake = new DatalakeServiceClient(
        Config.DATALAKE_ADDRESS,
        grpc.credentials.createInsecure()
    )

    datalake.getAllSongs(new GetAllSongsRequest(), (err, res) => {
        res.getSongsList().forEach((song) => {
            console.log(song)
        })
    })
}

async function makeRedisConnection() {
    if (Config.REDIS_PASSWORD == null) {
        logger.error('No redis password set! Exiting!')
        process.exit(1)
    }

    const redisConnection = new IORedis(Config.REDIS_PORT, Config.REDIS_HOST, {
        password: Config.REDIS_PASSWORD,
    })

    try {
        const res = await redisConnection.ping()
        logger.debug(`Recieved ping response from redis: ${res}`)
        if (res != 'PONG') {
            logger.error('No redis connection! Exiting!')
            process.exit(1)
        }
    } catch (error) {
        logger.error('No redis connection! Exiting!')
        process.exit(1)
    }

    logger.info('Connected to Redis')

    return redisConnection
}
