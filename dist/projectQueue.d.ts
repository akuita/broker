import { BrokerAsPromised as Broker } from "rascal";
declare type UpdateProgressAction = {
    type: "UPDATE_PROGRESS";
    data: {
        projectName: string;
        projectId: number;
        projectExportId?: number;
        projectPreviewId?: number;
        percentage: number;
        message: string;
    };
};
declare type CompletedAction = {
    type: "COMPLETE";
    data: {
        projectName: string;
        projectId: number;
        projectExportId?: number;
        projectPreviewId?: number;
        path: string;
    };
};
declare type ProgressPayload = UpdateProgressAction | CompletedAction;
declare type Logger = {
    debug: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
declare type Config = {
    messageQueue: {
        url: string;
        exportProject: string;
        reportProject: string;
    };
    aws: {
        keyId: string;
        accessKey: string;
        bucket: string;
        region: string;
    };
    storage: "local" | "s3";
};
export declare class ProjectQueue {
    broker: Broker;
    config: Config;
    logger: Logger;
    constructor(broker: Broker, config: Config, logger: Logger);
    static create(name: string, config: Config, logger: Logger): Promise<ProjectQueue>;
    handleClosed(): void;
    close(): Promise<void>;
    receivePayload(callback: (mesg: string | null) => Promise<void>): Promise<void>;
    updateProgress(payload: ProgressPayload): Promise<void>;
    storeFile(zipFile: string, bucketPath: string): Promise<string>;
    private toReportPayload;
}
export {};
