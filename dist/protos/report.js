"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report_ProjectPreview = exports.Report_ProjectExport = exports.Report_Complete = exports.Report_Progress = exports.Report = exports.protobufPackage = void 0;
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = "protobuf";
function createBaseReport() {
    return {
        projectName: "",
        projectId: 0,
        progress: undefined,
        complete: undefined,
        projectExport: undefined,
        projectPreview: undefined,
    };
}
exports.Report = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.projectName !== "") {
            writer.uint32(10).string(message.projectName);
        }
        if (message.projectId !== 0) {
            writer.uint32(16).int32(message.projectId);
        }
        if (message.progress !== undefined) {
            exports.Report_Progress.encode(message.progress, writer.uint32(26).fork()).ldelim();
        }
        if (message.complete !== undefined) {
            exports.Report_Complete.encode(message.complete, writer.uint32(34).fork()).ldelim();
        }
        if (message.projectExport !== undefined) {
            exports.Report_ProjectExport.encode(message.projectExport, writer.uint32(42).fork()).ldelim();
        }
        if (message.projectPreview !== undefined) {
            exports.Report_ProjectPreview.encode(message.projectPreview, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
                    message.progress = exports.Report_Progress.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.complete = exports.Report_Complete.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.projectExport = exports.Report_ProjectExport.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.projectPreview = exports.Report_ProjectPreview.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            projectName: isSet(object.projectName) ? String(object.projectName) : "",
            projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
            progress: isSet(object.progress) ? exports.Report_Progress.fromJSON(object.progress) : undefined,
            complete: isSet(object.complete) ? exports.Report_Complete.fromJSON(object.complete) : undefined,
            projectExport: isSet(object.projectExport) ? exports.Report_ProjectExport.fromJSON(object.projectExport) : undefined,
            projectPreview: isSet(object.projectPreview) ? exports.Report_ProjectPreview.fromJSON(object.projectPreview) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.projectName !== undefined && (obj.projectName = message.projectName);
        message.projectId !== undefined && (obj.projectId = Math.round(message.projectId));
        message.progress !== undefined &&
            (obj.progress = message.progress ? exports.Report_Progress.toJSON(message.progress) : undefined);
        message.complete !== undefined &&
            (obj.complete = message.complete ? exports.Report_Complete.toJSON(message.complete) : undefined);
        message.projectExport !== undefined &&
            (obj.projectExport = message.projectExport ? exports.Report_ProjectExport.toJSON(message.projectExport) : undefined);
        message.projectPreview !== undefined &&
            (obj.projectPreview = message.projectPreview ? exports.Report_ProjectPreview.toJSON(message.projectPreview) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseReport();
        message.projectName = object.projectName ?? "";
        message.projectId = object.projectId ?? 0;
        message.progress = (object.progress !== undefined && object.progress !== null)
            ? exports.Report_Progress.fromPartial(object.progress)
            : undefined;
        message.complete = (object.complete !== undefined && object.complete !== null)
            ? exports.Report_Complete.fromPartial(object.complete)
            : undefined;
        message.projectExport = (object.projectExport !== undefined && object.projectExport !== null)
            ? exports.Report_ProjectExport.fromPartial(object.projectExport)
            : undefined;
        message.projectPreview = (object.projectPreview !== undefined && object.projectPreview !== null)
            ? exports.Report_ProjectPreview.fromPartial(object.projectPreview)
            : undefined;
        return message;
    },
};
function createBaseReport_Progress() {
    return { percentage: 0, message: "" };
}
exports.Report_Progress = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.percentage !== 0) {
            writer.uint32(13).float(message.percentage);
        }
        if (message.message !== "") {
            writer.uint32(18).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            percentage: isSet(object.percentage) ? Number(object.percentage) : 0,
            message: isSet(object.message) ? String(object.message) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.percentage !== undefined && (obj.percentage = message.percentage);
        message.message !== undefined && (obj.message = message.message);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseReport_Progress();
        message.percentage = object.percentage ?? 0;
        message.message = object.message ?? "";
        return message;
    },
};
function createBaseReport_Complete() {
    return { path: "" };
}
exports.Report_Complete = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.path !== "") {
            writer.uint32(10).string(message.path);
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return { path: isSet(object.path) ? String(object.path) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.path !== undefined && (obj.path = message.path);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseReport_Complete();
        message.path = object.path ?? "";
        return message;
    },
};
function createBaseReport_ProjectExport() {
    return { id: 0 };
}
exports.Report_ProjectExport = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).int32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseReport_ProjectExport();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { id: isSet(object.id) ? Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseReport_ProjectExport();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseReport_ProjectPreview() {
    return { id: 0 };
}
exports.Report_ProjectPreview = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).int32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseReport_ProjectPreview();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { id: isSet(object.id) ? Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },
    fromPartial(object) {
        const message = createBaseReport_ProjectPreview();
        message.id = object.id ?? 0;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=report.js.map