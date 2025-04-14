import { Request, Response } from 'express'
import { UserModel } from '../models/user'

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById(req.userId).select('username role')
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res
      .status(500)
      .json({ error: (error as Error).message || 'Internal server error' })
  }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' })
      return
    }

    const deletedUser = await UserModel.findByIdAndDelete(userId)

    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res
      .status(500)
      .json({ error: (error as Error).message || 'Internal server error' })
  }
}

export const userController = {
  getProfile,
  deleteUser,
}
