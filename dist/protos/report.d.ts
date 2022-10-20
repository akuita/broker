import * as _m0 from 'protobufjs/minimal';
export declare const protobufPackage = "protobuf";
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
export declare const Report: {
    encode(message: Report, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Report;
    fromJSON(object: any): Report;
    toJSON(message: Report): unknown;
    fromPartial<I extends {
        projectName?: string | undefined;
        projectId?: number | undefined;
        projectExportId?: number | undefined;
        progress?: {
            percentage?: number | undefined;
            message?: string | undefined;
        } | undefined;
        complete?: {
            path?: string | undefined;
        } | undefined;
    } & {
        projectName?: string | undefined;
        projectId?: number | undefined;
        projectExportId?: number | undefined;
        progress?: ({
            percentage?: number | undefined;
            message?: string | undefined;
        } & {
            percentage?: number | undefined;
            message?: string | undefined;
        } & { [K in Exclude<keyof I["progress"], keyof Report_Progress>]: never; }) | undefined;
        complete?: ({
            path?: string | undefined;
        } & {
            path?: string | undefined;
        } & { [K_1 in Exclude<keyof I["complete"], "path">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Report>]: never; }>(object: I): Report;
};
export declare const Report_Progress: {
    encode(message: Report_Progress, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Report_Progress;
    fromJSON(object: any): Report_Progress;
    toJSON(message: Report_Progress): unknown;
    fromPartial<I extends {
        percentage?: number | undefined;
        message?: string | undefined;
    } & {
        percentage?: number | undefined;
        message?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Report_Progress>]: never; }>(object: I): Report_Progress;
};
export declare const Report_Complete: {
    encode(message: Report_Complete, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Report_Complete;
    fromJSON(object: any): Report_Complete;
    toJSON(message: Report_Complete): unknown;
    fromPartial<I extends {
        path?: string | undefined;
    } & {
        path?: string | undefined;
    } & { [K in Exclude<keyof I, "path">]: never; }>(object: I): Report_Complete;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
