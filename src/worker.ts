import { Worker, Job } from 'bullmq'
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

export class SongWorker {
    worker: Worker<SongJobData, SongJobReturn>
    datalake: DatalakeServiceClient
    bucket: Bucket

    constructor(
        datalake: DatalakeServiceClient,
        redisConnection: IORedis.Redis,
        bucket: Bucket
    ) {
        this.bucket = bucket
        this.datalake = datalake
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

    async songAlreadyExists(downloadUrl: string) {
        return new Promise<boolean>((resolve, reject) => {
            const req = new GetSongsByTagsRequest()
            req.getTagsMap().set('downloadUrl', downloadUrl)

            this.datalake.getSongsByTags(req, (err, res) => {
                if (err) {
                    // on error assume song doesnt exist
                    resolve(false)
                } else {
                    const songExists = res.getSongsList().length > 0
                    resolve(songExists)
                }
            })
        })
    }

    async uploadAddFile(addFile: AddFile) {
        return new Promise<void>((resolve, reject) => {
            const addSongsReq = new AddSongsRequest()
            addSongsReq.addSongs(addFile)
            this.datalake.addSongs(addSongsReq, (err, res) => {
                if (err) {
                    reject()
                } else {
                    resolve()
                }
            })
        })
    }

    async onJob(job: Job<SongJobData, SongJobReturn>) {
        const downloadUrl = job.data.downloadUrl

        logger.debug(`Received Job: ${downloadUrl}`)

        const alreadyExists = await this.songAlreadyExists(downloadUrl)

        if (alreadyExists) {
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

        await this.uploadAddFile(addFile)

        logger.info(`Uploaded Metadata to Datalake`)

        fs.rmSync(folderPath, { recursive: true, force: true })

        return 'done'
    }
}
