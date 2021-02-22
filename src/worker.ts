import { Worker, Job } from 'bullmq'
import { Config } from './config'
import { logger } from './logger'
import IORedis from 'ioredis'
import { SongJobData, SongJobReturn } from './interface/songJob'

export class SongWorker {
    worker: Worker<SongJobData, SongJobReturn>

    constructor(redisConnection: IORedis.Redis) {
        this.worker = new Worker<SongJobData, SongJobReturn>(
            Config.SONG_QUEUE_NAME,
            this.onJob,
            {
                connection: redisConnection,
            }
        )
    }

    async close() {
        return this.worker.close()
    }

    async onJob(job: Job<SongJobData, SongJobReturn>) {
        const downloadUrl = job.data.downloadUrl

        logger.info(`Downloading: ${downloadUrl}`)
        //TODO: Implement download -> get info.json -> to datalake & bucket
        return 'done'
    }
}
