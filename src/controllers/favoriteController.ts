import { Request, Response } from 'express'
import { UserModel } from '../models/user'
import { CourseModel } from '../models/course'

const addToFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId
    const { courseId } = req.body
    if (!courseId) {
      res.status(400).json({ message: 'Course ID is required' })
      return
    }

    const course = await CourseModel.findById(courseId)

    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }

    const user = await UserModel.findById(userId)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    if (user.favorites.includes(courseId)) {
      res.status(400).json({ message: 'Course is already in favorites' })
      return
    }

    user.favorites.push(courseId)
    await user.save()

    res.status(200).json({ message: 'Course added to favorites' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

const removeFromFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId
    const { courseId } = req.body

    if (!courseId) {
      res.status(400).json({ message: 'Course ID is required' })
      return
    }

    const user = await UserModel.findById(userId)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const index = user.favorites.indexOf(courseId)
    if (index === -1) {
      res.status(400).json({ message: 'Course is not in favorites' })
      return
    }

    user.favorites.splice(index, 1)
    await user.save()

    res.status(200).json({ message: 'Course removed from favorites' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const favoriteController = {
  addToFavorites,
  removeFromFavorites,
}
