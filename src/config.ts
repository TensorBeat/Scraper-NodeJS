export class Config {
    static DATALAKE_ADDRESS =
        process.env.DATALAKE_ADDRESS ?? 'grpc.test.tensorbeat.com:50051'
}
