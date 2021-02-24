import { AddFile } from '../generated/tensorbeat/common_pb'
import { DatalakeServiceClient } from '../generated/tensorbeat/datalake_grpc_pb'
import {
    AddSongsRequest,
    GetSongsByTagsRequest,
} from '../generated/tensorbeat/datalake_pb'

export class Datalake {
    datalake: DatalakeServiceClient

    constructor(datalake: DatalakeServiceClient) {
        this.datalake = datalake
    }
    async doesSongExist(downloadUrl: string) {
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
}
