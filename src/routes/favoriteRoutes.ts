
import { Router } from 'express'
import { favoriteController } from '../controllers/favoriteController'
import { authenticateJWT } from '../middlewares/authMiddleware'

const router = Router()

router.post('/favorites', authenticateJWT, favoriteController.addToFavorites)

router.delete('/favorites', authenticateJWT, favoriteController.removeFromFavorites)

export const favoriteRoutes = router
