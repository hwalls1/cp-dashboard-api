import initBucket from '../services/initBucket.service';
import { S3 } from 'aws-sdk';
import { Request, Response } from 'express';

import uploadToS3 from '../services/uploadToS3.service';
import config from 'config';
import AppDataSource from '../utils/connectToDb';
import { File } from '../entities/file.entity';
import { format } from 'date-fns'

const fileRepository =
  AppDataSource.getRepository(File);

class UploadController {
  static Upload = async (req: Request, res: Response) => {
    const s3 = new S3({
      accessKeyId: config.get<string>('awsAccessKeyID'),
      secretAccessKey: config.get<string>('awsSecretAccessKey'),
    });

    // Initialize bucket
    await initBucket(s3);
    console.log(JSON.stringify(req.file))

    const uploadRes = await uploadToS3(s3, req.file);

    if (uploadRes.success) {
      // Create file entity
      const file = new File();
      file.type = req.file?.mimetype ?? "";
      file.dateUploaded = format(new Date(), "yyyy-MM-dd");
      file.name = req.file?.filename ?? uploadRes.uri ?? "";
      file.src = uploadRes.uri ?? "";
      file.description = "";
      file.owner = res.locals.user.user;

      const savedFile = await fileRepository.save(
        fileRepository.create(file)
      );

      res.status(200).json({
        ...uploadRes,
        file: savedFile
      });

    } else {
      res.status(400).json(uploadRes);
    }
  };
}

export default UploadController;
