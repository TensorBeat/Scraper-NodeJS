require('dotenv').config()
import { setQueues, BullMQAdapter, router } from 'bull-board'
import { Queue } from 'bullmq'
import { Config } from './config'
import { makeRedisConnection } from './services/redis'
import express from 'express'
import { logger } from './logger'
;(async () => {
    const redis = await makeRedisConnection()

    const testSongQueue = new Queue(Config.TEST_SONG_QUEUE_NAME, {
        connection: redis,
    })
    const testCrawlerQueue = new Queue(Config.TEST_SC_CRAWLER_QUEUE_NAME, {
        connection: redis,
    })
    const prodSongQueue = new Queue(Config.PROD_SONG_QUEUE_NAME, {
        connection: redis,
    })
    const prodCrawlerQueue = new Queue(Config.PROD_SC_CRAWLER_QUEUE_NAME, {
        connection: redis,
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
