import { Job, Queue, Worker } from 'bullmq'
import { Config } from '../config'
import { SongJobData, SongJobReturn } from '../interface/songJob'
import {
    SpotifyCrawlerJobData,
    SpotifyCrawlerJobReturn,
} from '../interface/spotifyCrawlerJob'
import { logger } from '../logger'
import { Datalake } from '../services/datalake'
import IORedis from 'ioredis'
import searchYouTube from 'yt-search'
import SpotifyWebAPI from 'spotify-web-api-node'
import { METHODS } from 'node:http'

export class SpotifyCrawler {
    songQueue: Queue<SongJobData, SongJobReturn>
    datalake: Datalake
    worker: Worker<SpotifyCrawlerJobData, SpotifyCrawlerJobReturn>
    crawlerQueue: Queue<SpotifyCrawlerJobData, SpotifyCrawlerJobReturn>
    spotifyApi: SpotifyWebAPI

    constructor(
        songQueue: Queue<SongJobData, SongJobReturn>,
        datalake: Datalake,
        redisConnection: IORedis.Redis
    ) {
        this.spotifyApi = new SpotifyWebAPI({
            clientId: Config.SPOTIFY_CLIENT_ID,
            clientSecret: Config.SPOTIFY_CLIENT_SECRET,
        })

        this.spotifyApi.clientCredentialsGrant().then(
            (data) => {
                this.spotifyApi.setAccessToken(data.body['access_token'])
            },
            (err) => {
                logger.error(
                    'An error occurred when fetching client credentials:\n',
                    err
                )
                process.exit(-1)
            }
        )

        this.songQueue = songQueue
        this.datalake = datalake

        this.crawlerQueue = new Queue<
            SpotifyCrawlerJobData,
            SpotifyCrawlerJobReturn
        >(Config.SPOTIFY_CRAWLER_QUEUE_NAME, {
            connection: redisConnection,
        })

        this.crawlerQueue.drain()

        this.worker = new Worker<
            SpotifyCrawlerJobData,
            SpotifyCrawlerJobReturn
        >(Config.SPOTIFY_CRAWLER_QUEUE_NAME, this.onJob, {
            connection: redisConnection,
            limiter: {
                max: 3,
                duration: 1000,
            },
        })

        this.worker.pause()
        this.maybeSeedCrawlerQueue().then(() => {
            this.worker.resume()
        })
    }

    close() {
        return this.worker.close()
    }

    onJob = async (
        job: Job<SpotifyCrawlerJobData, SpotifyCrawlerJobReturn>
    ) => {
        // VERY USEFUL FOR API SEARCH: https://developer.spotify.com/console/
        logger.debug(`Start crawling: ${job.data.jobType} ${job.data.id}`)

        return await this.jobFunctions[job.data.jobType](
            job.data.id,
            job.data.meta
        )
    }

    private jobFunctions: {
        [jobType: string]: (
            id: string,
            meta: { [detail: string]: string | string[] }
        ) => Promise<string>
    } = {
        genre: async (id, _meta) => {
            this.spotifyApi
                .getRecommendations({
                    seed_genres: id,
                })
                .then(this.parseAndPushRecommendations)
            return 'done'
        },
        artist: async (id, meta) => {
            this.spotifyApi
                .getRecommendations({
                    seed_artists: meta.name,
                })
                .then(this.parseAndPushRecommendations)
            return 'done'
        },
        album: async (id, meta) => {
            this.spotifyApi.getAlbumTracks(id).then(async (response) => {
                this.songQueue.addBulk(
                    await Promise.all(
                        response.body.items.map(async (track) => {
                            return {
                                name: this.buildDataLakeId(track.id),
                                data: {
                                    downloadUrl: await this.findSongOnYouTube(
                                        track.name,
                                        track.artists.map(
                                            (artist) => artist.name
                                        )
                                    ),
                                },
                            }
                        })
                    )
                )
            })
            return 'done'
        },
        track: async (id, meta) => {
            const dataLakeId = this.buildDataLakeId(id)
            if (await this.datalake.doesSongExist(dataLakeId)) {
                return 'already downloaded'
            }
            this.spotifyApi
                .getRecommendations({
                    seed_tracks: [id],
                })
                .then(this.parseAndPushRecommendations)
            return 'done'
        },
    }

    private parseAndPushRecommendations = async (response: {
        // Response data type has to be pseudo-hardcoded because apparently
        // Response<SpotifyApi.RecommendationsFromSeedsResponse> doesn't work
        body: SpotifyApi.RecommendationsFromSeedsResponse
    }) => {
        this.crawlerQueue.addBulk(
            response.body.tracks.map((track) => {
                return {
                    name: this.buildDataLakeId(track.id),
                    data: {
                        jobType: 'track',
                        id: track.id,
                        meta: {
                            name: track.name,
                            artists: track.artists.map((artist) => {
                                return artist.name
                            }),
                            length: `${track.duration_ms}`,
                        },
                    },
                }
            })
        )
    }

    private buildDataLakeId = (id: string) => {
        return `s:${id}`
    }

    private maybeSeedCrawlerQueue = async () => {
        logger.info('Getting Genre Seeds')
        if ((await this.crawlerQueue.getWaitingCount()) != 0) {
            return
        }
        this.spotifyApi.getAvailableGenreSeeds().then((res) => {
            logger.info('Got Genre Seeds')
            this.crawlerQueue.addBulk(
                res.body.genres.map((genre) => {
                    return {
                        name: genre,
                        data: {
                            jobType: 'genre',
                            id: genre,
                            meta: {},
                        },
                    }
                })
            )
        })
    }

    // ADAPTED FROM https://github.com/SwapnilSoni1999/spotify-dl/blob/master/util/get-link.js
    private attemptToFindSongOnYouTube = async (searchTerm: string) => {
        let searchResult = await searchYouTube(searchTerm)
        if (searchResult.videos.length == 0) {
            return null
        }
        let [topResult] = searchResult.videos
        return topResult.url.startsWith('https://youtube.com')
            ? topResult.url
            : 'https://youtube.com' + topResult.url
    }

    // ADAPTED FROM https://github.com/SwapnilSoni1999/spotify-dl/blob/master/util/get-link.js
    private findSongOnYouTube = async (
        songName: string,
        artistNames: string[]
    ) => {
        try {
            let searchTerm = `${songName} ${artistNames.join(' ')}`
            this.attemptToFindSongOnYouTube(searchTerm) ??
                this.attemptToFindSongOnYouTube(searchTerm.replace('-', ' '))
        } catch (err) {
            return err
        }
    }
}
