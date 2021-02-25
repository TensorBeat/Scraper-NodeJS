require('dotenv').config()
import { setQueues, BullMQAdapter, router } from 'bull-board'
import { Queue } from 'bullmq'
import { Config } from './config'
import { makeRedisConnection } from './services/redis'
import express from 'express'
import { logger } from './logger'
;(async () => {
    const redisConnection = await makeRedisConnection()

    const testSongQueue = new Queue(Config.TEST_SONG_QUEUE_NAME, {
        connection: redisConnection,
    })
    const testCrawlerQueue = new Queue(Config.TEST_SC_CRAWLER_QUEUE_NAME, {
        connection: redisConnection,
    })
    const prodSongQueue = new Queue(Config.PROD_SONG_QUEUE_NAME, {
        connection: redisConnection,
    })
    const prodCrawlerQueue = new Queue(Config.PROD_SC_CRAWLER_QUEUE_NAME, {
        connection: redisConnection,
    })

    setQueues([
        new BullMQAdapter(prodSongQueue),
        new BullMQAdapter(prodCrawlerQueue),
        new BullMQAdapter(testSongQueue),
        new BullMQAdapter(testCrawlerQueue),
    ])

    const app = express()

    app.use('/', router)

    app.listen(Config.BULL_BOARD_PORT, () => {
        logger.info(
            `Bull Board listening on: http://localhost:${Config.BULL_BOARD_PORT}`
        )
    })
})()
