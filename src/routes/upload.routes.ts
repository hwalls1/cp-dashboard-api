import express from 'express';
import multer from 'multer';

import UploadController from '../controllers/upload.controller';
import multerConfig from '../utils/multerConfig';

const router = express.Router();
const upload = multer(multerConfig);

router.post(
  '/api/upload',
  upload.single('uploaded_file'),
  UploadController.Upload
);

export default router;