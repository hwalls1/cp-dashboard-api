import express from 'express';
import {
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
} from '../controllers/auth.controller';
import requireUser from '../middleware/requireUser';

const router = express.Router();

router.post('/api/login', loginHandler);
router.post('/api/refresh', refreshAccessTokenHandler);
router.get('/api/logout/:id', requireUser, logoutHandler);

export default router;
