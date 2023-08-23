import express from 'express';
import {
  getAllPitchesHandler,
  getOnePitchHandler,
  createPitchHandler,
  updatePitchHandler,
  deletePitchHandler,
} from '../controllers/pitch.controller';

const router = express.Router();

router.get('/api/pitches', getAllPitchesHandler);
router.get('/api/pitches/:id', getOnePitchHandler);
router.post('/api/pitches', createPitchHandler);
router.put('/api/pitches/:id', updatePitchHandler);
router.delete('/api/pitches/:id', deletePitchHandler);

export default router;
