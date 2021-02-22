// package: tensorbeat.datalake
// file: tensorbeat/datalake.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as tensorbeat_datalake_pb from "../tensorbeat/datalake_pb";
import * as tensorbeat_common_pb from "../tensorbeat/common_pb";

interface IDatalakeServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getAllSongs: IDatalakeServiceService_IGetAllSongs;
    getSongsByIDs: IDatalakeServiceService_IGetSongsByIDs;
    getSongsByTags: IDatalakeServiceService_IGetSongsByTags;
    addSongs: IDatalakeServiceService_IAddSongs;
    addTags: IDatalakeServiceService_IAddTags;
    removeTags: IDatalakeServiceService_IRemoveTags;
}

interface IDatalakeServiceService_IGetAllSongs extends grpc.MethodDefinition<tensorbeat_datalake_pb.GetAllSongsRequest, tensorbeat_datalake_pb.GetAllSongsResponse> {
    path: "/tensorbeat.datalake.DatalakeService/GetAllSongs";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<tensorbeat_datalake_pb.GetAllSongsRequest>;
    requestDeserialize: grpc.deserialize<tensorbeat_datalake_pb.GetAllSongsRequest>;
    responseSerialize: grpc.serialize<tensorbeat_datalake_pb.GetAllSongsResponse>;
    responseDeserialize: grpc.deserialize<tensorbeat_datalake_pb.GetAllSongsResponse>;
}
interface IDatalakeServiceService_IGetSongsByIDs extends grpc.MethodDefinition<tensorbeat_datalake_pb.GetSongsByIDsRequest, tensorbeat_datalake_pb.GetSongsByIDsResponse> {
    path: "/tensorbeat.datalake.DatalakeService/GetSongsByIDs";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<tensorbeat_datalake_pb.GetSongsByIDsRequest>;
    requestDeserialize: grpc.deserialize<tensorbeat_datalake_pb.GetSongsByIDsRequest>;
    responseSerialize: grpc.serialize<tensorbeat_datalake_pb.GetSongsByIDsResponse>;
    responseDeserialize: grpc.deserialize<tensorbeat_datalake_pb.GetSongsByIDsResponse>;
}
interface IDatalakeServiceService_IGetSongsByTags extends grpc.MethodDefinition<tensorbeat_datalake_pb.GetSongsByTagsRequest, tensorbeat_datalake_pb.GetSongsByTagsResponse> {
    path: "/tensorbeat.datalake.DatalakeService/GetSongsByTags";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<tensorbeat_datalake_pb.GetSongsByTagsRequest>;
    requestDeserialize: grpc.deserialize<tensorbeat_datalake_pb.GetSongsByTagsRequest>;
    responseSerialize: grpc.serialize<tensorbeat_datalake_pb.GetSongsByTagsResponse>;
    responseDeserialize: grpc.deserialize<tensorbeat_datalake_pb.GetSongsByTagsResponse>;
}
interface IDatalakeServiceService_IAddSongs extends grpc.MethodDefinition<tensorbeat_datalake_pb.AddSongsRequest, tensorbeat_datalake_pb.AddSongsResponse> {
    path: "/tensorbeat.datalake.DatalakeService/AddSongs";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<tensorbeat_datalake_pb.AddSongsRequest>;
    requestDeserialize: grpc.deserialize<tensorbeat_datalake_pb.AddSongsRequest>;
    responseSerialize: grpc.serialize<tensorbeat_datalake_pb.AddSongsResponse>;
    responseDeserialize: grpc.deserialize<tensorbeat_datalake_pb.AddSongsResponse>;
}
interface IDatalakeServiceService_IAddTags extends grpc.MethodDefinition<tensorbeat_datalake_pb.AddTagsRequest, tensorbeat_datalake_pb.AddTagsResponse> {
    path: "/tensorbeat.datalake.DatalakeService/AddTags";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<tensorbeat_datalake_pb.AddTagsRequest>;
    requestDeserialize: grpc.deserialize<tensorbeat_datalake_pb.AddTagsRequest>;
    responseSerialize: grpc.serialize<tensorbeat_datalake_pb.AddTagsResponse>;
    responseDeserialize: grpc.deserialize<tensorbeat_datalake_pb.AddTagsResponse>;
}
interface IDatalakeServiceService_IRemoveTags extends grpc.MethodDefinition<tensorbeat_datalake_pb.RemoveTagsRequest, tensorbeat_datalake_pb.RemoveTagsResponse> {
    path: "/tensorbeat.datalake.DatalakeService/RemoveTags";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<tensorbeat_datalake_pb.RemoveTagsRequest>;
    requestDeserialize: grpc.deserialize<tensorbeat_datalake_pb.RemoveTagsRequest>;
    responseSerialize: grpc.serialize<tensorbeat_datalake_pb.RemoveTagsResponse>;
    responseDeserialize: grpc.deserialize<tensorbeat_datalake_pb.RemoveTagsResponse>;
}

export const DatalakeServiceService: IDatalakeServiceService;

export interface IDatalakeServiceServer extends grpc.UntypedServiceImplementation {
    getAllSongs: grpc.handleUnaryCall<tensorbeat_datalake_pb.GetAllSongsRequest, tensorbeat_datalake_pb.GetAllSongsResponse>;
    getSongsByIDs: grpc.handleUnaryCall<tensorbeat_datalake_pb.GetSongsByIDsRequest, tensorbeat_datalake_pb.GetSongsByIDsResponse>;
    getSongsByTags: grpc.handleUnaryCall<tensorbeat_datalake_pb.GetSongsByTagsRequest, tensorbeat_datalake_pb.GetSongsByTagsResponse>;
    addSongs: grpc.handleUnaryCall<tensorbeat_datalake_pb.AddSongsRequest, tensorbeat_datalake_pb.AddSongsResponse>;
    addTags: grpc.handleUnaryCall<tensorbeat_datalake_pb.AddTagsRequest, tensorbeat_datalake_pb.AddTagsResponse>;
    removeTags: grpc.handleUnaryCall<tensorbeat_datalake_pb.RemoveTagsRequest, tensorbeat_datalake_pb.RemoveTagsResponse>;
}

export interface IDatalakeServiceClient {
    getAllSongs(request: tensorbeat_datalake_pb.GetAllSongsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetAllSongsResponse) => void): grpc.ClientUnaryCall;
    getAllSongs(request: tensorbeat_datalake_pb.GetAllSongsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetAllSongsResponse) => void): grpc.ClientUnaryCall;
    getAllSongs(request: tensorbeat_datalake_pb.GetAllSongsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetAllSongsResponse) => void): grpc.ClientUnaryCall;
    getSongsByIDs(request: tensorbeat_datalake_pb.GetSongsByIDsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByIDsResponse) => void): grpc.ClientUnaryCall;
    getSongsByIDs(request: tensorbeat_datalake_pb.GetSongsByIDsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByIDsResponse) => void): grpc.ClientUnaryCall;
    getSongsByIDs(request: tensorbeat_datalake_pb.GetSongsByIDsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByIDsResponse) => void): grpc.ClientUnaryCall;
    getSongsByTags(request: tensorbeat_datalake_pb.GetSongsByTagsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByTagsResponse) => void): grpc.ClientUnaryCall;
    getSongsByTags(request: tensorbeat_datalake_pb.GetSongsByTagsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByTagsResponse) => void): grpc.ClientUnaryCall;
    getSongsByTags(request: tensorbeat_datalake_pb.GetSongsByTagsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByTagsResponse) => void): grpc.ClientUnaryCall;
    addSongs(request: tensorbeat_datalake_pb.AddSongsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddSongsResponse) => void): grpc.ClientUnaryCall;
    addSongs(request: tensorbeat_datalake_pb.AddSongsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddSongsResponse) => void): grpc.ClientUnaryCall;
    addSongs(request: tensorbeat_datalake_pb.AddSongsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddSongsResponse) => void): grpc.ClientUnaryCall;
    addTags(request: tensorbeat_datalake_pb.AddTagsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddTagsResponse) => void): grpc.ClientUnaryCall;
    addTags(request: tensorbeat_datalake_pb.AddTagsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddTagsResponse) => void): grpc.ClientUnaryCall;
    addTags(request: tensorbeat_datalake_pb.AddTagsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddTagsResponse) => void): grpc.ClientUnaryCall;
    removeTags(request: tensorbeat_datalake_pb.RemoveTagsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.RemoveTagsResponse) => void): grpc.ClientUnaryCall;
    removeTags(request: tensorbeat_datalake_pb.RemoveTagsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.RemoveTagsResponse) => void): grpc.ClientUnaryCall;
    removeTags(request: tensorbeat_datalake_pb.RemoveTagsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.RemoveTagsResponse) => void): grpc.ClientUnaryCall;
}

export class DatalakeServiceClient extends grpc.Client implements IDatalakeServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getAllSongs(request: tensorbeat_datalake_pb.GetAllSongsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetAllSongsResponse) => void): grpc.ClientUnaryCall;
    public getAllSongs(request: tensorbeat_datalake_pb.GetAllSongsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetAllSongsResponse) => void): grpc.ClientUnaryCall;
    public getAllSongs(request: tensorbeat_datalake_pb.GetAllSongsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetAllSongsResponse) => void): grpc.ClientUnaryCall;
    public getSongsByIDs(request: tensorbeat_datalake_pb.GetSongsByIDsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByIDsResponse) => void): grpc.ClientUnaryCall;
    public getSongsByIDs(request: tensorbeat_datalake_pb.GetSongsByIDsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByIDsResponse) => void): grpc.ClientUnaryCall;
    public getSongsByIDs(request: tensorbeat_datalake_pb.GetSongsByIDsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByIDsResponse) => void): grpc.ClientUnaryCall;
    public getSongsByTags(request: tensorbeat_datalake_pb.GetSongsByTagsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByTagsResponse) => void): grpc.ClientUnaryCall;
    public getSongsByTags(request: tensorbeat_datalake_pb.GetSongsByTagsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByTagsResponse) => void): grpc.ClientUnaryCall;
    public getSongsByTags(request: tensorbeat_datalake_pb.GetSongsByTagsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.GetSongsByTagsResponse) => void): grpc.ClientUnaryCall;
    public addSongs(request: tensorbeat_datalake_pb.AddSongsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddSongsResponse) => void): grpc.ClientUnaryCall;
    public addSongs(request: tensorbeat_datalake_pb.AddSongsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddSongsResponse) => void): grpc.ClientUnaryCall;
    public addSongs(request: tensorbeat_datalake_pb.AddSongsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddSongsResponse) => void): grpc.ClientUnaryCall;
    public addTags(request: tensorbeat_datalake_pb.AddTagsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddTagsResponse) => void): grpc.ClientUnaryCall;
    public addTags(request: tensorbeat_datalake_pb.AddTagsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddTagsResponse) => void): grpc.ClientUnaryCall;
    public addTags(request: tensorbeat_datalake_pb.AddTagsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.AddTagsResponse) => void): grpc.ClientUnaryCall;
    public removeTags(request: tensorbeat_datalake_pb.RemoveTagsRequest, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.RemoveTagsResponse) => void): grpc.ClientUnaryCall;
    public removeTags(request: tensorbeat_datalake_pb.RemoveTagsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.RemoveTagsResponse) => void): grpc.ClientUnaryCall;
    public removeTags(request: tensorbeat_datalake_pb.RemoveTagsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: tensorbeat_datalake_pb.RemoveTagsResponse) => void): grpc.ClientUnaryCall;
}
