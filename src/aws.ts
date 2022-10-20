import * as AWS from "aws-sdk";

export function uploadToS3(
  path: string,
  buffer: Buffer,
  config: { keyId: string; accessKey: string; bucket: string; region: string }
): Promise<string> {
  const s3 = new AWS.S3({
    accessKeyId: config.keyId,
    secretAccessKey: config.accessKey,
    region: config.region,
  });

  return new Promise((resolve, reject) => {
    s3.upload({ Bucket: config.bucket, Key: path, Body: buffer }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}
