// package: tensorbeat.common
// file: tensorbeat/common.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class AddFile extends jspb.Message { 
    getName(): string;
    setName(value: string): AddFile;
    getUri(): string;
    setUri(value: string): AddFile;
    getMimetype(): string;
    setMimetype(value: string): AddFile;

    getTagsMap(): jspb.Map<string, string>;
    clearTagsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddFile.AsObject;
    static toObject(includeInstance: boolean, msg: AddFile): AddFile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddFile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddFile;
    static deserializeBinaryFromReader(message: AddFile, reader: jspb.BinaryReader): AddFile;
}

export namespace AddFile {
    export type AsObject = {
        name: string,
        uri: string,
        mimetype: string,

        tagsMap: Array<[string, string]>,
    }
}

export class File extends jspb.Message { 
    getId(): string;
    setId(value: string): File;
    getName(): string;
    setName(value: string): File;
    getUri(): string;
    setUri(value: string): File;
    getMimetype(): string;
    setMimetype(value: string): File;

    getTagsMap(): jspb.Map<string, string>;
    clearTagsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): File.AsObject;
    static toObject(includeInstance: boolean, msg: File): File.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: File, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): File;
    static deserializeBinaryFromReader(message: File, reader: jspb.BinaryReader): File;
}

export namespace File {
    export type AsObject = {
        id: string,
        name: string,
        uri: string,
        mimetype: string,

        tagsMap: Array<[string, string]>,
    }
}
