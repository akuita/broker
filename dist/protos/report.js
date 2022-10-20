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
exports.Report_Complete = exports.Report_Progress = exports.Report = exports.protobufPackage = void 0;
const _m0 = __importStar(require("protobufjs/minimal"));
exports.protobufPackage = 'protobuf';
function createBaseReport() {
    return {
        projectName: '',
        projectId: 0,
        projectExportId: 0,
        progress: undefined,
        complete: undefined,
    };
}
exports.Report = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.projectName !== '') {
            writer.uint32(10).string(message.projectName);
        }
        if (message.projectId !== 0) {
            writer.uint32(16).int32(message.projectId);
        }
        if (message.projectExportId !== 0) {
            writer.uint32(24).int32(message.projectExportId);
        }
        if (message.progress !== undefined) {
            exports.Report_Progress.encode(message.progress, writer.uint32(34).fork()).ldelim();
        }
        if (message.complete !== undefined) {
            exports.Report_Complete.encode(message.complete, writer.uint32(42).fork()).ldelim();
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
                    message.projectExportId = reader.int32();
                    break;
                case 4:
                    message.progress = exports.Report_Progress.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.complete = exports.Report_Complete.decode(reader, reader.uint32());
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
            projectName: isSet(object.projectName) ? String(object.projectName) : '',
            projectId: isSet(object.projectId) ? Number(object.projectId) : 0,
            projectExportId: isSet(object.projectExportId)
                ? Number(object.projectExportId)
                : 0,
            progress: isSet(object.progress)
                ? exports.Report_Progress.fromJSON(object.progress)
                : undefined,
            complete: isSet(object.complete)
                ? exports.Report_Complete.fromJSON(object.complete)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.projectName !== undefined &&
            (obj.projectName = message.projectName);
        message.projectId !== undefined &&
            (obj.projectId = Math.round(message.projectId));
        message.projectExportId !== undefined &&
            (obj.projectExportId = Math.round(message.projectExportId));
        message.progress !== undefined &&
            (obj.progress = message.progress
                ? exports.Report_Progress.toJSON(message.progress)
                : undefined);
        message.complete !== undefined &&
            (obj.complete = message.complete
                ? exports.Report_Complete.toJSON(message.complete)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseReport();
        message.projectName = object.projectName ?? '';
        message.projectId = object.projectId ?? 0;
        message.projectExportId = object.projectExportId ?? 0;
        message.progress =
            object.progress !== undefined && object.progress !== null
                ? exports.Report_Progress.fromPartial(object.progress)
                : undefined;
        message.complete =
            object.complete !== undefined && object.complete !== null
                ? exports.Report_Complete.fromPartial(object.complete)
                : undefined;
        return message;
    },
};
function createBaseReport_Progress() {
    return { percentage: 0, message: '' };
}
exports.Report_Progress = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.percentage !== 0) {
            writer.uint32(13).float(message.percentage);
        }
        if (message.message !== '') {
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
            message: isSet(object.message) ? String(object.message) : '',
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
        message.message = object.message ?? '';
        return message;
    },
};
function createBaseReport_Complete() {
    return { path: '' };
}
exports.Report_Complete = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.path !== '') {
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
        return {
            path: isSet(object.path) ? String(object.path) : '',
        };
    },
    toJSON(message) {
        const obj = {};
        message.path !== undefined && (obj.path = message.path);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseReport_Complete();
        message.path = object.path ?? '';
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=report.js.map