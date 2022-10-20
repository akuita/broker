import * as fs from "fs-extra";
import * as path from "path";
import { BrokerAsPromised as Broker, withDefaultConfig } from "rascal";
import { Report, Report_Complete, Report_Progress } from "./protos/report";
import { uploadToS3 } from "./aws";

type UpdateProgressAction = {
  type: "UPDATE_PROGRESS";
  data: {
    projectName: string;
    projectId: number;
    projectExportId: number;
    percentage: number;
    message: string;
  };
};

type CompletedAction = {
  type: "COMPLETE";
  data: {
    projectName: string;
    projectId: number;
    projectExportId: number;
    path: string;
  };
};

type ProgressPayload = UpdateProgressAction | CompletedAction;
type Logger = {
  debug: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
};
type Config = {
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

export class ProjectQueue {
  broker: Broker;
  config: Config;
  logger: Logger;

  constructor(broker: Broker, config: Config, logger: Logger) {
    this.broker = broker;
    this.config = config;
    this.logger = logger;
  }

  static async create(name: string, config: Config, logger: Logger) {
    try {
      logger.debug(`[Message Queue]: Establishing ${name}'s connection.`);
      const broker = await Broker.create(
        withDefaultConfig({
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
        })
      );
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
    } catch (err) {
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

  async receivePayload(callback: (mesg: string | null) => Promise<void>) {
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
    } catch (err) {
      this.logger.error(err);
    }
  }

  async updateProgress(payload: ProgressPayload) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const publication = await this.broker.publish(
          this.config.messageQueue.reportProject,
          JSON.stringify(this.toReportPayload(payload))
        );
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
      } catch (err) {
        this.logger.error(err);
        reject();
      }
    });
  }

  async storeFile(zipFile: string, bucketPath: string) {
    switch (this.config.storage) {
      case "local": {
        return path.resolve(zipFile);
      }

      case "s3": {
        this.logger.debug(`[S3]: Upload ${zipFile} started.`);
        const zipContent = fs.readFileSync(zipFile, {
          flag: "r",
        });
        await uploadToS3(bucketPath, zipContent, this.config.aws);
        this.logger.debug(`[S3]: Upload ${zipFile} completed.`);
        return bucketPath;
      }
    }
  }

  private toReportPayload(payload: ProgressPayload): Report {
    switch (payload.type) {
      case "UPDATE_PROGRESS":
        return {
          projectName: payload.data.projectName,
          projectId: payload.data.projectId,
          projectExportId: payload.data.projectExportId,
          progress: Report_Progress.fromPartial({
            percentage: payload.data.percentage,
            message: payload.data.message,
          }),
          complete: undefined,
        };

      case "COMPLETE":
        return {
          projectName: payload.data.projectName,
          projectId: payload.data.projectId,
          projectExportId: payload.data.projectExportId,
          progress: undefined,
          complete: Report_Complete.fromPartial({
            path: payload.data.path,
          }),
        };
    }
  }
}
