import { S3 } from 'aws-sdk';
import config from 'config';
import fs from 'fs';

/**
 * @name uploadToS3
 * @param {S3} s3
 * @param {File} fileData
 * @returns {Promise<{success:boolean; message: string; data: object;}>}
 */
const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {
    const fileContent = fs.readFileSync(fileData!.path);

    const params = {
      Bucket: config.get<string>('bucketName'),
      Key: fileData!.originalname,
      Body: fileContent,
    };

    try {
      const s3Res = await s3.upload(params).promise();

      console.log('File Uploaded Successfully', s3Res.Location);

      return {
        success: true,
        message: 'File Uploaded Successfully',
        uri: s3Res.Location
      };
    } catch (error) {
      return {
        success: false,
        message: 'Unable to Upload the file',
        data: error,
      };
    }
  } catch (error) {
    return { success: false, message: 'Unable to access this file', data: {} };
  }
};

export default uploadToS3;
