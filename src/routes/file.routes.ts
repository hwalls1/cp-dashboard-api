import express from 'express';
import {
  createFileHandler,
  updateFileHandler,
  findFileHandler,
  getAllFilesHandler,
} from '../controllers/file.controller';

const router = express.Router();

router.post('/api/files/', createFileHandler);
router.post('/api/files/:id/', updateFileHandler);
router.get('/api/files/:id', findFileHandler);
router.get('/api/files', getAllFilesHandler);

export default router;
