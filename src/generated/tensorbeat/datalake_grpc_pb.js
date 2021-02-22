// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var tensorbeat_datalake_pb = require('../tensorbeat/datalake_pb.js');
var tensorbeat_common_pb = require('../tensorbeat/common_pb.js');

function serialize_tensorbeat_datalake_AddSongsRequest(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.AddSongsRequest)) {
    throw new Error('Expected argument of type tensorbeat.datalake.AddSongsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_AddSongsRequest(buffer_arg) {
  return tensorbeat_datalake_pb.AddSongsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_AddSongsResponse(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.AddSongsResponse)) {
    throw new Error('Expected argument of type tensorbeat.datalake.AddSongsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_AddSongsResponse(buffer_arg) {
  return tensorbeat_datalake_pb.AddSongsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_AddTagsRequest(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.AddTagsRequest)) {
    throw new Error('Expected argument of type tensorbeat.datalake.AddTagsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_AddTagsRequest(buffer_arg) {
  return tensorbeat_datalake_pb.AddTagsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_AddTagsResponse(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.AddTagsResponse)) {
    throw new Error('Expected argument of type tensorbeat.datalake.AddTagsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_AddTagsResponse(buffer_arg) {
  return tensorbeat_datalake_pb.AddTagsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_GetAllSongsRequest(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.GetAllSongsRequest)) {
    throw new Error('Expected argument of type tensorbeat.datalake.GetAllSongsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_GetAllSongsRequest(buffer_arg) {
  return tensorbeat_datalake_pb.GetAllSongsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_GetAllSongsResponse(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.GetAllSongsResponse)) {
    throw new Error('Expected argument of type tensorbeat.datalake.GetAllSongsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_GetAllSongsResponse(buffer_arg) {
  return tensorbeat_datalake_pb.GetAllSongsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_GetSongsByIDsRequest(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.GetSongsByIDsRequest)) {
    throw new Error('Expected argument of type tensorbeat.datalake.GetSongsByIDsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_GetSongsByIDsRequest(buffer_arg) {
  return tensorbeat_datalake_pb.GetSongsByIDsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_GetSongsByIDsResponse(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.GetSongsByIDsResponse)) {
    throw new Error('Expected argument of type tensorbeat.datalake.GetSongsByIDsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_GetSongsByIDsResponse(buffer_arg) {
  return tensorbeat_datalake_pb.GetSongsByIDsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_GetSongsByTagsRequest(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.GetSongsByTagsRequest)) {
    throw new Error('Expected argument of type tensorbeat.datalake.GetSongsByTagsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_GetSongsByTagsRequest(buffer_arg) {
  return tensorbeat_datalake_pb.GetSongsByTagsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_GetSongsByTagsResponse(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.GetSongsByTagsResponse)) {
    throw new Error('Expected argument of type tensorbeat.datalake.GetSongsByTagsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_GetSongsByTagsResponse(buffer_arg) {
  return tensorbeat_datalake_pb.GetSongsByTagsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_RemoveTagsRequest(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.RemoveTagsRequest)) {
    throw new Error('Expected argument of type tensorbeat.datalake.RemoveTagsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_RemoveTagsRequest(buffer_arg) {
  return tensorbeat_datalake_pb.RemoveTagsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tensorbeat_datalake_RemoveTagsResponse(arg) {
  if (!(arg instanceof tensorbeat_datalake_pb.RemoveTagsResponse)) {
    throw new Error('Expected argument of type tensorbeat.datalake.RemoveTagsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tensorbeat_datalake_RemoveTagsResponse(buffer_arg) {
  return tensorbeat_datalake_pb.RemoveTagsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DatalakeServiceService = exports.DatalakeServiceService = {
  getAllSongs: {
    path: '/tensorbeat.datalake.DatalakeService/GetAllSongs',
    requestStream: false,
    responseStream: false,
    requestType: tensorbeat_datalake_pb.GetAllSongsRequest,
    responseType: tensorbeat_datalake_pb.GetAllSongsResponse,
    requestSerialize: serialize_tensorbeat_datalake_GetAllSongsRequest,
    requestDeserialize: deserialize_tensorbeat_datalake_GetAllSongsRequest,
    responseSerialize: serialize_tensorbeat_datalake_GetAllSongsResponse,
    responseDeserialize: deserialize_tensorbeat_datalake_GetAllSongsResponse,
  },
  getSongsByIDs: {
    path: '/tensorbeat.datalake.DatalakeService/GetSongsByIDs',
    requestStream: false,
    responseStream: false,
    requestType: tensorbeat_datalake_pb.GetSongsByIDsRequest,
    responseType: tensorbeat_datalake_pb.GetSongsByIDsResponse,
    requestSerialize: serialize_tensorbeat_datalake_GetSongsByIDsRequest,
    requestDeserialize: deserialize_tensorbeat_datalake_GetSongsByIDsRequest,
    responseSerialize: serialize_tensorbeat_datalake_GetSongsByIDsResponse,
    responseDeserialize: deserialize_tensorbeat_datalake_GetSongsByIDsResponse,
  },
  getSongsByTags: {
    path: '/tensorbeat.datalake.DatalakeService/GetSongsByTags',
    requestStream: false,
    responseStream: false,
    requestType: tensorbeat_datalake_pb.GetSongsByTagsRequest,
    responseType: tensorbeat_datalake_pb.GetSongsByTagsResponse,
    requestSerialize: serialize_tensorbeat_datalake_GetSongsByTagsRequest,
    requestDeserialize: deserialize_tensorbeat_datalake_GetSongsByTagsRequest,
    responseSerialize: serialize_tensorbeat_datalake_GetSongsByTagsResponse,
    responseDeserialize: deserialize_tensorbeat_datalake_GetSongsByTagsResponse,
  },
  addSongs: {
    path: '/tensorbeat.datalake.DatalakeService/AddSongs',
    requestStream: false,
    responseStream: false,
    requestType: tensorbeat_datalake_pb.AddSongsRequest,
    responseType: tensorbeat_datalake_pb.AddSongsResponse,
    requestSerialize: serialize_tensorbeat_datalake_AddSongsRequest,
    requestDeserialize: deserialize_tensorbeat_datalake_AddSongsRequest,
    responseSerialize: serialize_tensorbeat_datalake_AddSongsResponse,
    responseDeserialize: deserialize_tensorbeat_datalake_AddSongsResponse,
  },
  addTags: {
    path: '/tensorbeat.datalake.DatalakeService/AddTags',
    requestStream: false,
    responseStream: false,
    requestType: tensorbeat_datalake_pb.AddTagsRequest,
    responseType: tensorbeat_datalake_pb.AddTagsResponse,
    requestSerialize: serialize_tensorbeat_datalake_AddTagsRequest,
    requestDeserialize: deserialize_tensorbeat_datalake_AddTagsRequest,
    responseSerialize: serialize_tensorbeat_datalake_AddTagsResponse,
    responseDeserialize: deserialize_tensorbeat_datalake_AddTagsResponse,
  },
  removeTags: {
    path: '/tensorbeat.datalake.DatalakeService/RemoveTags',
    requestStream: false,
    responseStream: false,
    requestType: tensorbeat_datalake_pb.RemoveTagsRequest,
    responseType: tensorbeat_datalake_pb.RemoveTagsResponse,
    requestSerialize: serialize_tensorbeat_datalake_RemoveTagsRequest,
    requestDeserialize: deserialize_tensorbeat_datalake_RemoveTagsRequest,
    responseSerialize: serialize_tensorbeat_datalake_RemoveTagsResponse,
    responseDeserialize: deserialize_tensorbeat_datalake_RemoveTagsResponse,
  },
};

exports.DatalakeServiceClient = grpc.makeGenericClientConstructor(DatalakeServiceService);
