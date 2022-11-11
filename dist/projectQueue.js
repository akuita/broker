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
exports.ProjectQueue = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const rascal_1 = require("rascal");
const report_1 = require("./protos/report");
const aws_1 = require("./aws");
class ProjectQueue {
    broker;
    config;
    logger;
    constructor(broker, config, logger) {
        this.broker = broker;
        this.config = config;
        this.logger = logger;
    }
    static async create(name, config, logger) {
        try {
            logger.debug(`[Message Queue]: Establishing ${name}'s connection.`);
            const broker = await rascal_1.BrokerAsPromised.create((0, rascal_1.withDefaultConfig)({
                vhosts: {
                    "/": {
                        connection: {
                            url: config.messageQueue.url,
                            socketOptions: {
                                clientProperties: { connection_name: name },
                            },
                        },
                        queues: [
                            {
                                name: config.messageQueue.exportProject,
                                options: { durable: true },
                            },
                            {
                                name: config.messageQueue.reportProject,
                                options: { durable: true },
                            },
                        ],
                        exchanges: [""],
                        subscriptions: {
                            [config.messageQueue.exportProject]: {
                                queue: config.messageQueue.exportProject,
                            },
                        },
                        publications: {
                            [config.messageQueue.reportProject]: {
                                queue: config.messageQueue.reportProject,
                            },
                        },
                    },
                },
            }));
            broker.on("error", (err, { vhost, connectionUrl }) => {
                logger.error("Broker error", err, vhost, connectionUrl);
            });
            broker.on("vhost_initialised", ({ vhost, connectionUrl }) => {
                logger.debug(`[Message Queue]: Vhost ${vhost} was initialised using connection: ${connectionUrl}`);
            });
            const projectQueue = new ProjectQueue(broker, config, logger);
            projectQueue.handleClosed();
            logger.debug(`[Message Queue]: Opened ${name}'s channel.`);
            return projectQueue;
        }
        catch (err) {
            logger.error(err);
            throw err;
        }
    }
    handleClosed() {
        this.broker
            .on("SIGINT", async () => {
            await this.broker.shutdown();
            process.exit();
        })
            .on("SIGTERM", async () => {
            await this.broker.shutdown();
            process.exit();
        })
            .on("unhandledRejection", async (reason, p) => {
            this.logger.error(reason, "Unhandled Rejection at Promise", p);
            await this.broker.shutdown();
            process.exit(-1);
        })
            .on("uncaughtException", (err) => {
            this.logger.error(err, "Uncaught Exception thrown");
            this.broker.shutdown();
        });
    }
    close() {
        return this.broker.shutdown();
    }
    async receivePayload(callback) {
        try {
            const subscription = await this.broker.subscribe(this.config.messageQueue.exportProject);
            subscription
                .on("message", async (_message, content, ackOrNack) => {
                await callback(content);
                ackOrNack();
            })
                .on("error", (err) => {
                this.logger.error("Subscriber error", err);
            });
        }
        catch (err) {
            this.logger.error(err);
        }
    }
    async updateProgress(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const publication = await this.broker.publish(this.config.messageQueue.reportProject, JSON.stringify(this.toReportPayload(payload)));
                publication
                    .on("success", () => {
                    resolve();
                })
                    .on("return", () => {
                    resolve();
                })
                    .on("error", (err, messageId) => {
                    this.logger.error("Publisher error", err, messageId);
                });
            }
            catch (err) {
                this.logger.error(err);
                reject();
            }
        });
    }
    async storeFile(zipFile, bucketPath) {
        switch (this.config.storage) {
            case "local": {
                return path.resolve(zipFile);
            }
            case "s3": {
                this.logger.debug(`[S3]: Upload ${zipFile} started.`);
                const zipContent = fs.readFileSync(zipFile, {
                    flag: "r",
                });
                await (0, aws_1.uploadToS3)(bucketPath, zipContent, this.config.aws);
                this.logger.debug(`[S3]: Upload ${zipFile} completed.`);
                return bucketPath;
            }
        }
    }
    toReportPayload(payload) {
        const generateType = payload.data.projectExportId
            ? { projectExport: { id: payload.data.projectExportId }, projectPreview: undefined }
            : payload.data.projectPreviewId
                ? { projectPreview: { id: payload.data.projectPreviewId }, projectExport: undefined }
                : undefined;
        if (!generateType) {
            throw new Error("either projectExportId or projectPreviewId must be exist.");
        }
        switch (payload.type) {
            case "UPDATE_PROGRESS":
                return {
                    projectName: payload.data.projectName,
                    projectId: payload.data.projectId,
                    progress: report_1.Report_Progress.fromPartial({
                        percentage: payload.data.percentage,
                        message: payload.data.message,
                    }),
                    complete: undefined,
                    ...generateType,
                };
            case "COMPLETE":
                return {
                    projectName: payload.data.projectName,
                    projectId: payload.data.projectId,
                    progress: undefined,
                    complete: report_1.Report_Complete.fromPartial({
                        path: payload.data.path,
                    }),
                    ...generateType,
                };
        }
    }
}
exports.ProjectQueue = ProjectQueue;
//# sourceMappingURL=projectQueue.js.map