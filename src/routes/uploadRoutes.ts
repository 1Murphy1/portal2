import express from 'express'
import { upload, processImage } from '../middlewares/upload'

const router = express.Router()

router.post('/upload', upload.single('image'), processImage, (req, res) => {
    if (!req.file) {
      res.status(400).json({ message: 'the file was not uploaded' })
      return
    }
  
    res.status(200).json({
      message: 'The file was uploaded successfully',
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    })
  })

export default router
