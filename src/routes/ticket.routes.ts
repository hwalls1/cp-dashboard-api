import express from 'express';
import {
  getAllTicketsHandler,
  getOneTicketHandler,
  createTicketHandler,
  updateTicketHandler,
  deleteTicketHandler,
} from '../controllers/ticket.controller';

const router = express.Router();

router.get('/api/tickets', getAllTicketsHandler);
router.get('/api/tickets/:id', getOneTicketHandler);
router.post('/api/tickets', createTicketHandler);
router.put('/api/tickets/:id', updateTicketHandler);
router.delete('/api/tickets/:id', deleteTicketHandler);

export default router;
