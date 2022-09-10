import express from 'express'
import { TicketController } from '../controllers/ticketController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', protect, TicketController.getTickets)
router.get('/user', protect, TicketController.getUserTickets)
router.get('/:id', protect, TicketController.getTicket)
router.post('/', protect, TicketController.setTicket)
router.put('/', protect, TicketController.updateTicket)
router.delete('/:id', protect, TicketController.deleteTicket)

export default router
