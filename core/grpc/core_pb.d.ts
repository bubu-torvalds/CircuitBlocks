// package: cc.arduino.cli.commands
// file: core.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class PlatformInstallReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;

    getPlatformPackage(): string;
    setPlatformPackage(value: string): void;

    getArchitecture(): string;
    setArchitecture(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformInstallReq.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformInstallReq): PlatformInstallReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformInstallReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformInstallReq;
    static deserializeBinaryFromReader(message: PlatformInstallReq, reader: jspb.BinaryReader): PlatformInstallReq;
}

export namespace PlatformInstallReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
        platformPackage: string,
        architecture: string,
        version: string,
    }
}

export class PlatformInstallResp extends jspb.Message { 

    hasProgress(): boolean;
    clearProgress(): void;
    getProgress(): common_pb.DownloadProgress | undefined;
    setProgress(value?: common_pb.DownloadProgress): void;


    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): common_pb.TaskProgress | undefined;
    setTaskProgress(value?: common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformInstallResp.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformInstallResp): PlatformInstallResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformInstallResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformInstallResp;
    static deserializeBinaryFromReader(message: PlatformInstallResp, reader: jspb.BinaryReader): PlatformInstallResp;
}

export namespace PlatformInstallResp {
    export type AsObject = {
        progress?: common_pb.DownloadProgress.AsObject,
        taskProgress?: common_pb.TaskProgress.AsObject,
    }
}

export class PlatformDownloadReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;

    getPlatformPackage(): string;
    setPlatformPackage(value: string): void;

    getArchitecture(): string;
    setArchitecture(value: string): void;

    getVersion(): string;
    setVersion(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformDownloadReq.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformDownloadReq): PlatformDownloadReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformDownloadReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformDownloadReq;
    static deserializeBinaryFromReader(message: PlatformDownloadReq, reader: jspb.BinaryReader): PlatformDownloadReq;
}

export namespace PlatformDownloadReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
        platformPackage: string,
        architecture: string,
        version: string,
    }
}

export class PlatformDownloadResp extends jspb.Message { 

    hasProgress(): boolean;
    clearProgress(): void;
    getProgress(): common_pb.DownloadProgress | undefined;
    setProgress(value?: common_pb.DownloadProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformDownloadResp.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformDownloadResp): PlatformDownloadResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformDownloadResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformDownloadResp;
    static deserializeBinaryFromReader(message: PlatformDownloadResp, reader: jspb.BinaryReader): PlatformDownloadResp;
}

export namespace PlatformDownloadResp {
    export type AsObject = {
        progress?: common_pb.DownloadProgress.AsObject,
    }
}

export class PlatformUninstallReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;

    getPlatformPackage(): string;
    setPlatformPackage(value: string): void;

    getArchitecture(): string;
    setArchitecture(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformUninstallReq.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformUninstallReq): PlatformUninstallReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformUninstallReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformUninstallReq;
    static deserializeBinaryFromReader(message: PlatformUninstallReq, reader: jspb.BinaryReader): PlatformUninstallReq;
}

export namespace PlatformUninstallReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
        platformPackage: string,
        architecture: string,
    }
}

export class PlatformUninstallResp extends jspb.Message { 

    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): common_pb.TaskProgress | undefined;
    setTaskProgress(value?: common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformUninstallResp.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformUninstallResp): PlatformUninstallResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformUninstallResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformUninstallResp;
    static deserializeBinaryFromReader(message: PlatformUninstallResp, reader: jspb.BinaryReader): PlatformUninstallResp;
}

export namespace PlatformUninstallResp {
    export type AsObject = {
        taskProgress?: common_pb.TaskProgress.AsObject,
    }
}

export class PlatformUpgradeReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;

    getPlatformPackage(): string;
    setPlatformPackage(value: string): void;

    getArchitecture(): string;
    setArchitecture(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformUpgradeReq.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformUpgradeReq): PlatformUpgradeReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformUpgradeReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformUpgradeReq;
    static deserializeBinaryFromReader(message: PlatformUpgradeReq, reader: jspb.BinaryReader): PlatformUpgradeReq;
}

export namespace PlatformUpgradeReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
        platformPackage: string,
        architecture: string,
    }
}

export class PlatformUpgradeResp extends jspb.Message { 

    hasProgress(): boolean;
    clearProgress(): void;
    getProgress(): common_pb.DownloadProgress | undefined;
    setProgress(value?: common_pb.DownloadProgress): void;


    hasTaskProgress(): boolean;
    clearTaskProgress(): void;
    getTaskProgress(): common_pb.TaskProgress | undefined;
    setTaskProgress(value?: common_pb.TaskProgress): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformUpgradeResp.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformUpgradeResp): PlatformUpgradeResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformUpgradeResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformUpgradeResp;
    static deserializeBinaryFromReader(message: PlatformUpgradeResp, reader: jspb.BinaryReader): PlatformUpgradeResp;
}

export namespace PlatformUpgradeResp {
    export type AsObject = {
        progress?: common_pb.DownloadProgress.AsObject,
        taskProgress?: common_pb.TaskProgress.AsObject,
    }
}

export class PlatformSearchReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;

    getSearchArgs(): string;
    setSearchArgs(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformSearchReq.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformSearchReq): PlatformSearchReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformSearchReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformSearchReq;
    static deserializeBinaryFromReader(message: PlatformSearchReq, reader: jspb.BinaryReader): PlatformSearchReq;
}

export namespace PlatformSearchReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
        searchArgs: string,
    }
}

export class PlatformSearchResp extends jspb.Message { 
    clearSearchOutputList(): void;
    getSearchOutputList(): Array<Platform>;
    setSearchOutputList(value: Array<Platform>): void;
    addSearchOutput(value?: Platform, index?: number): Platform;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformSearchResp.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformSearchResp): PlatformSearchResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformSearchResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformSearchResp;
    static deserializeBinaryFromReader(message: PlatformSearchResp, reader: jspb.BinaryReader): PlatformSearchResp;
}

export namespace PlatformSearchResp {
    export type AsObject = {
        searchOutputList: Array<Platform.AsObject>,
    }
}

export class PlatformListReq extends jspb.Message { 

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): common_pb.Instance | undefined;
    setInstance(value?: common_pb.Instance): void;

    getUpdatableOnly(): boolean;
    setUpdatableOnly(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformListReq.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformListReq): PlatformListReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformListReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformListReq;
    static deserializeBinaryFromReader(message: PlatformListReq, reader: jspb.BinaryReader): PlatformListReq;
}

export namespace PlatformListReq {
    export type AsObject = {
        instance?: common_pb.Instance.AsObject,
        updatableOnly: boolean,
    }
}

export class PlatformListResp extends jspb.Message { 
    clearInstalledPlatformList(): void;
    getInstalledPlatformList(): Array<Platform>;
    setInstalledPlatformList(value: Array<Platform>): void;
    addInstalledPlatform(value?: Platform, index?: number): Platform;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlatformListResp.AsObject;
    static toObject(includeInstance: boolean, msg: PlatformListResp): PlatformListResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlatformListResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlatformListResp;
    static deserializeBinaryFromReader(message: PlatformListResp, reader: jspb.BinaryReader): PlatformListResp;
}

export namespace PlatformListResp {
    export type AsObject = {
        installedPlatformList: Array<Platform.AsObject>,
    }
}

export class Platform extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getInstalled(): string;
    setInstalled(value: string): void;

    getLatest(): string;
    setLatest(value: string): void;

    getName(): string;
    setName(value: string): void;

    getMaintainer(): string;
    setMaintainer(value: string): void;

    getWebsite(): string;
    setWebsite(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    clearBoardsList(): void;
    getBoardsList(): Array<Board>;
    setBoardsList(value: Array<Board>): void;
    addBoards(value?: Board, index?: number): Board;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Platform.AsObject;
    static toObject(includeInstance: boolean, msg: Platform): Platform.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Platform, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Platform;
    static deserializeBinaryFromReader(message: Platform, reader: jspb.BinaryReader): Platform;
}

export namespace Platform {
    export type AsObject = {
        id: string,
        installed: string,
        latest: string,
        name: string,
        maintainer: string,
        website: string,
        email: string,
        boardsList: Array<Board.AsObject>,
    }
}

export class Board extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getFqbn(): string;
    setFqbn(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Board.AsObject;
    static toObject(includeInstance: boolean, msg: Board): Board.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Board, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Board;
    static deserializeBinaryFromReader(message: Board, reader: jspb.BinaryReader): Board;
}

export namespace Board {
    export type AsObject = {
        name: string,
        fqbn: string,
    }
}
