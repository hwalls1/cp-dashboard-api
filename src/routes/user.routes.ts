import express from 'express';
import {
  registerUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
  getAllUsersHandler,
  findUserHandler,
  updateUserHandler,
  deleteUserHandler
} from '../controllers/user.controller';
import requireUser from '../middleware/requireUser';

const router = express.Router();

// Register user
router.post('/api/register', registerUserHandler);
router.post('/api/verify/:id/:verificationCode', verifyUserHandler);
router.post('/api/forgotpassword', forgotPasswordHandler);
router.post('/api/resetpassword/:id/:passwordResetCode', resetPasswordHandler);
router.get('/api/me', requireUser, getCurrentUserHandler);

router.get('/api/users', getAllUsersHandler);
router.get('/api/users/:id', findUserHandler);
router.post('/api/users/:id', updateUserHandler);
router.delete('/api/users/:id', deleteUserHandler);


export default router;
