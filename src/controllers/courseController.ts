import { Request, Response } from 'express'
import { CourseModel } from '../models/course'
import mongoose from 'mongoose'

const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category,
      level,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query

    const filters: Record<string, unknown> = {}

    if (search) {
      filters.title = { $regex: search, $options: 'i' }
    }

    if (category) {
      filters.category = category
    }

    if (level) {
      filters.level = level
    }

    const skip = (+page - 1) * +limit
    const sortOptions: Record<string, 1 | -1> = {
      [sortBy as string]: order === 'asc' ? 1 : -1,
    }

    const courses = await CourseModel.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(+limit)

    const total = await CourseModel.countDocuments(filters)

    res.status(200).json({ total, courses })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid course ID' })
      return
    }

    const course = await CourseModel.findById(id)

    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }

    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = new CourseModel({ ...req.body, author: req.userId })
    await course.save()
    res.status(201).json(course)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const course = await CourseModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }

    res.status(200).json(course)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const course = await CourseModel.findByIdAndDelete(id)

    if (!course) {
      res.status(404).json({ message: 'Course not found' })
      return
    }

    res.status(200).json({ message: 'Course deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const courseController = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
}
