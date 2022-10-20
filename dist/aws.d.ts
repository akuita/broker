/// <reference types="node" />
export declare function uploadToS3(path: string, buffer: Buffer, config: {
    keyId: string;
    accessKey: string;
    bucket: string;
    region: string;
}): Promise<string>;
