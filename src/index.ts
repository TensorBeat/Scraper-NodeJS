import { DatalakeServiceClient } from './generated/tensorbeat/datalake_grpc_pb'
import * as grpc from '@grpc/grpc-js'
import { Config } from './env'
import { GetAllSongsRequest } from './generated/tensorbeat/datalake_pb'
import { SoundCloudScraper } from './scrapers/soundCloudScraper'

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

const scraper = new SoundCloudScraper()

scraper.scrape()
