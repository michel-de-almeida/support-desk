import express from 'express'
import { NoteController } from '../controllers/noteController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/ticket/:id', protect, NoteController.getNotesByTicketId)
router.get('/:id', protect, NoteController.getNote)
router.post('/', protect, NoteController.setNote)
router.put('/', protect, NoteController.updateNote)
router.delete('/:id', protect, NoteController.deleteNote)

export default router
