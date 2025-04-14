import { Router } from 'express'
import { userController } from '../controllers/userController'
import { authenticateJWT } from '../middlewares/authMiddleware'

const router = Router()

router.get('/me', authenticateJWT, userController.getProfile)
router.delete('/me', authenticateJWT, userController.deleteUser)

export const userRoutes = router
