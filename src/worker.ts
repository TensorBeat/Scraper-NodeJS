import { Worker, Job, Queue } from 'bullmq'
import { Config } from './config'
import { logger } from './logger'
import IORedis from 'ioredis'
import { SongJobData, SongJobReturn } from './interface/songJob'
import { downloadSong } from './util'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import fg from 'fast-glob'
import { DatalakeServiceClient } from './generated/tensorbeat/datalake_grpc_pb'
import { AddFile } from './generated/tensorbeat/common_pb'
import {
    AddSongsRequest,
    GetSongsByTagsRequest,
} from './generated/tensorbeat/datalake_pb'
import { Bucket } from '@google-cloud/storage'
import path from 'path'
import { Datalake } from './services/datalake'

export class SongWorker {
    worker: Worker<SongJobData, SongJobReturn>
    datalake: Datalake
    bucket: Bucket
    songQueue: Queue<SongJobData, SongJobReturn>

    constructor(
        datalake: Datalake,
        redisConnection: IORedis.Redis,
        bucket: Bucket,
        songQueue: Queue<SongJobData, SongJobReturn>
    ) {
        this.bucket = bucket
        this.datalake = datalake
        this.songQueue = songQueue
        this.worker = new Worker<SongJobData, SongJobReturn>(
            Config.SONG_QUEUE_NAME,
            this.onJob.bind(this),
            {
                connection: redisConnection,
                // limits to max 1 song per sec across all workers
                limiter: {
                    max: 10,
                    duration: 1000,
                },
            }
        )
    }

    async close() {
        return this.worker.close()
    }

    async isAlreadyBeingProcessedByOtherWorker(
        job: Job<SongJobData, SongJobReturn>
    ) {
        const activeSongJobs: Job<
            SongJobData,
            SongJobReturn
        >[] = await this.songQueue.getActive()

        const res = activeSongJobs.find((activeSongJob) => {
            return activeSongJob.data.downloadUrl == job.data.downloadUrl
        })

        return res != null
    }

    async onJob(job: Job<SongJobData, SongJobReturn>) {
        const downloadUrl = job.data.downloadUrl

        logger.debug(`Received Job: ${downloadUrl}`)

        if (await this.isAlreadyBeingProcessedByOtherWorker(job)) {
            logger.info(`Another worker is processing: ${downloadUrl}`)
            return 'another worker is processing this url'
        }

        if (await this.datalake.doesSongExist(downloadUrl)) {
            logger.info(`Already Downloaded: ${downloadUrl}`)
            return 'already downloaded'
        }

        const folderPath = `./downloads/${uuidv4()}`

        logger.info(`Downloading: ${downloadUrl}`)
        await downloadSong(downloadUrl, folderPath, true)

        const songFileNames = await fg(`${folderPath}/*.mp3`)
        const songFilePath = songFileNames[0]
        const songFileName = path.basename(songFilePath)

        logger.debug(`Uploading to google cloud: ${songFileName}`)

        await this.bucket.upload(songFilePath, {
            destination: songFileName,
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        })

        const gcloudUri = `gs://${this.bucket.name}/${songFileName}`
        logger.debug(`Uploaded to gcloud - uri: ${gcloudUri}`)

        const infoFileNames = await fg(`${folderPath}/*.info.json`)
        const infoFileName = infoFileNames[0]
        const info = fs.readFileSync(infoFileName).toString()
        const infoJson = JSON.parse(info)

        const title = infoJson['title']
        const genre = infoJson['genre']
        const artist = infoJson['uploader']
        const views = infoJson['view_count'].toString()
        const duration = infoJson['duration'].toString()
        const likes = infoJson['like_count'].toString()
        const uploadTimestamp = infoJson['timestamp'].toString()

        const addFile = new AddFile()

        if (title != null) {
            addFile.setName(title)
        } else {
            addFile.setName(songFileName)
        }

        addFile.setMimetype('audio/mpeg')
        addFile.setUri(gcloudUri)
        addFile.getTagsMap().set('downloadUrl', downloadUrl)

        if (genre != null) addFile.getTagsMap().set('genre', genre)
        if (artist != null) addFile.getTagsMap().set('artist', artist)
        if (views != null) addFile.getTagsMap().set('views', views)
        if (duration != null) addFile.getTagsMap().set('duration', duration)
        if (likes != null) addFile.getTagsMap().set('likes', likes)
        if (uploadTimestamp != null)
            addFile.getTagsMap().set('uploadTimestamp', uploadTimestamp)

        await this.datalake.uploadAddFile(addFile)

        logger.info(`Uploaded Metadata to Datalake`)

        fs.rmSync(folderPath, { recursive: true, force: true })

        return 'done'
    }
}
