import { Request, Response } from 'express';
import {
  createFile,
  findFile,
  getAllFiles,
  updateFile,
} from '../services/file.service';

export async function createFileHandler(
  req: Request,
  res: Response
) {
  const body = req.body;
  try {
    const File = await createFile(body);

    return res.send({
      message: 'File successfully created',
      File,
    });
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not create File',
      error: err,
    });
  }
}

export async function updateFileHandler(
  req: Request,
  res: Response
) {
  const body = req.body;
  try {
    await updateFile(body);
    return res.send('File successfully updated');
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'File not updated',
    });
  }
}

export async function findFileHandler(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  try {
    const File = await findFile(id);

    return res.send(File);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'File not found',
    });
  }
}

export async function getAllFilesHandler(
  req: Request,
  res: Response
) {
  const query = req.query;

  try {
    const files = await getAllFiles(query);

    return res.send(files);
  } catch (err: any) {
    return res.status(409).json({
      status: 'fail',
      message: 'Could not retrieve Files',
      error: err,
    });
  }
}
