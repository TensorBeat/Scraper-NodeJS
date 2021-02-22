export class Config {
    static DATALAKE_ADDRESS =
        process.env.DATALAKE_ADDRESS ?? 'grpc.test.tensorbeat.com:50051'
    static REDIS_HOST = process.env.REDIS_HOST ?? 'redis.tensorbeat.com'
    static REDIS_PORT = parseInt(process.env.REDIS_PORT!) || 6379
    static REDIS_PASSWORD = process.env.REDIS_PASSWORD

    static SONG_QUEUE_NAME = process.env.QUEUE_NAME ?? 'songsTest'

    static IS_WORKER = process.env.WORKER == 'true'
    static IS_MASTER = process.env.MASTER == 'true'
    static IS_BOTH = !Config.IS_WORKER && !Config.IS_MASTER
}
