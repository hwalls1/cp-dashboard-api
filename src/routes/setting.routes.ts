import express from 'express';
import {
  getAllSettingsHandler,
  getOneSettingHandler,
  createSettingHandler,
  updateSettingHandler,
  deleteSettingHandler,
} from '../controllers/setting.controller';

const router = express.Router();

router.get('/api/settings', getAllSettingsHandler);
router.get('/api/settings/:id', getOneSettingHandler);
router.post('/api/settings', createSettingHandler);
router.post('/api/settings/:id', updateSettingHandler);
router.delete('/api/settings/:id', deleteSettingHandler);

export default router;
