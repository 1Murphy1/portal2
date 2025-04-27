import { Router } from 'express'
import { courseController } from '../controllers/courseController'
import { authenticateJWT } from '../middlewares/authMiddleware'
import { upload } from '../middlewares/upload'

const router = Router()

router.get('/courses', courseController.getCourses)
router.get('/courses/:id', courseController.getCourseById)

// router.post('/courses', authenticateJWT, courseController.createCourse)
router.put('/courses/:id', authenticateJWT, courseController.updateCourse)
router.delete('/courses/:id', authenticateJWT, courseController.deleteCourse)
router.post('/courses', authenticateJWT, upload.single('image'), courseController.createCourse)

export const courseRoutes = router
