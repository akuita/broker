/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "protobuf";

export interface Report {
  projectName: string;
  projectId: number;
  projectExportId: number;
  progress: Report_Progress | undefined;
  complete: Report_Complete | undefined;
}

export interface Report_Progress {
  percentage: number;
  message: string;
}

export interface Report_Complete {
  path: string;
}

function createBaseReport(): Report {
  return { projectName: "", projectId: 0, projectExportId: 0, progress: undefined, complete: undefined };
}

export const Report = {
  encode(message: Report, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectName !== "") {
      writer.uint32(10).string(message.projectName);
    }
    if (message.projectId !== 0) {
      writer.uint32(16).int32(message.projectId);
    }
    if (message.projectExportId !== 0) {
      writer.uint32(24).int32(message.projectExportId);
    }
    if (message.progress !== undefined) {
      Report_Progress.encode(message.progress, writer.uint32(34).fork()).ldelim();
    }
    if (message.complete !== undefined) {
      Report_Complete.encode(message.complete, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Report {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReport();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectName = reader.string();
          break;
        case 2:
          message.projectId = reader.int32();
          break;
        case 3:
          message.projectExportId = reader.int32();
          break;
        case 4:
          message.progress = Report_Progress.decode(reader, reader.uint32());
          break;
        case 5:
          message.complete = Report_Complete.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Report {
    return {
      projectName: isSet(object.projectName) ? String(object.projectName) : "",
      projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
      projectExportId: isSet(object.projectExportId) ? Number(object.projectExportId) : 0,
      progress: isSet(object.progress) ? Report_Progress.fromJSON(object.progress) : undefined,
      complete: isSet(object.complete) ? Report_Complete.fromJSON(object.complete) : undefined,
    };
  },

  toJSON(message: Report): unknown {
    const obj: any = {};
    message.projectName !== undefined && (obj.projectName = message.projectName);
    message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
    message.projectExportId !== undefined && (obj.projectExportId = Math.round(message.projectExportId));
    message.progress !== undefined &&
      (obj.progress = message.progress ? Report_Progress.toJSON(message.progress) : undefined);
    message.complete !== undefined &&
      (obj.complete = message.complete ? Report_Complete.toJSON(message.complete) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Report>, I>>(object: I): Report {
    const message = createBaseReport();
    message.projectName = object.projectName ?? "";
    message.projectId = object.projectId ?? 0;
    message.projectExportId = object.projectExportId ?? 0;
    message.progress = (object.progress !== undefined && object.progress !== null)
      ? Report_Progress.fromPartial(object.progress)
      : undefined;
    message.complete = (object.complete !== undefined && object.complete !== null)
      ? Report_Complete.fromPartial(object.complete)
      : undefined;
    return message;
  },
};

function createBaseReport_Progress(): Report_Progress {
  return { percentage: 0, message: "" };
}

export const Report_Progress = {
  encode(message: Report_Progress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.percentage !== 0) {
      writer.uint32(13).float(message.percentage);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Report_Progress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReport_Progress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.percentage = reader.float();
          break;
        case 2:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Report_Progress {
    return {
      percentage: isSet(object.percentage) ? Number(object.percentage) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: Report_Progress): unknown {
    const obj: any = {};
    message.percentage !== undefined && (obj.percentage = message.percentage);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Report_Progress>, I>>(object: I): Report_Progress {
    const message = createBaseReport_Progress();
    message.percentage = object.percentage ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseReport_Complete(): Report_Complete {
  return { path: "" };
}

export const Report_Complete = {
  encode(message: Report_Complete, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Report_Complete {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReport_Complete();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Report_Complete {
    return { path: isSet(object.path) ? String(object.path) : "" };
  },

  toJSON(message: Report_Complete): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Report_Complete>, I>>(object: I): Report_Complete {
    const message = createBaseReport_Complete();
    message.path = object.path ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
