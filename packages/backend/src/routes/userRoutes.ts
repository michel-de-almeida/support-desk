import express from 'express'
import { UserController } from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/me', protect, UserController.getLoggedUser)

export default router
