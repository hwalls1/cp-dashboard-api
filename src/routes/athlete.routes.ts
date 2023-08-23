import express from 'express';
import {
  createAthleteHandler,
  findAthleteHandler,
  getAllAthletesHandler,
  updateAthleteHandler,
  deleteAthleteHandler
} from '../controllers/athlete.controller';

const router = express.Router();

router.post('/api/athletes/', createAthleteHandler);
router.post('/api/athletes/:id', updateAthleteHandler);
router.get('/api/athletes/:id', findAthleteHandler);
router.get('/api/athletes', getAllAthletesHandler);
router.delete('/api/athletes/:id', deleteAthleteHandler);


export default router;
