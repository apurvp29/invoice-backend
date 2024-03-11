import * as AWS from "aws-sdk";
import * as fs from "fs-extra";
import { settings } from "../config/settings";
const s3 = new AWS.S3({
  accessKeyId: settings.awsCredentials.accessKeyId,
  secretAccessKey: settings.awsCredentials.secretAccessKey,
});

export const uploadFile = (fileName: string, bucketName: string) => {
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };

  return new Promise<string>((resolve, reject) => {
    s3.upload(params, (err: unknown | any, data: any) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      }
      const locationURL = data.Location;
      resolve(locationURL);
    });
  });
};
