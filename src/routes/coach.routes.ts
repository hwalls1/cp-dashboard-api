import express from 'express';
import {
  createCoachHandler,
  findCoachHandler,
  getAllCoachesHandler,
  updateCoachHandler
} from '../controllers/coach.controller';

const router = express.Router();

router.post('/api/coaches/', createCoachHandler);
router.post('/api/coaches/:id', updateCoachHandler);
router.get('/api/coaches/:id', findCoachHandler);
router.get('/api/coaches', getAllCoachesHandler);

export default router;
