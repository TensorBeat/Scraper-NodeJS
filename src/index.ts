require('dotenv').config()
import { DatalakeServiceClient } from './generated/tensorbeat/datalake_grpc_pb'
import * as grpc from '@grpc/grpc-js'
import { Config } from './config'
import {
    GetAllSongsRequest,
    GetSongsByTagsRequest,
} from './generated/tensorbeat/datalake_pb'
import { SoundCloudScrapeMaster } from './scrapers/soundCloudScrapeMaster'
import IORedis from 'ioredis'
import { logger } from './logger'
import { Queue } from 'bullmq'
import { SongWorker } from './worker'
import { SongJobData, SongJobReturn } from './interface/songJob'
import { Storage } from '@google-cloud/storage'

//TODO: https://github.com/felixmosh/bull-board
import { resolve } from 'dns'
;(async () => {
    const redisConnection = await makeRedisConnection()
    const datalake = new DatalakeServiceClient(
        Config.DATALAKE_ADDRESS,
        grpc.credentials.createInsecure()
    )

    if (Config.IS_WORKER || Config.IS_BOTH) {
        const storage = new Storage()
        const songBucket = storage.bucket(Config.BUCKET_NAME)
        logger.info(`Uploading songs to: ${Config.BUCKET_NAME}`)
        const worker = new SongWorker(datalake, redisConnection, songBucket)
    }

    if (Config.IS_MASTER || Config.IS_BOTH) {
        const songQueue = new Queue<SongJobData, SongJobReturn>(
            Config.SONG_QUEUE_NAME,
            {
                connection: redisConnection,
            }
        )

        const scraper = new SoundCloudScrapeMaster(songQueue)
        await scraper.scrape()
    }
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
