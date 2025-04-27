import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'

const uploadDir = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, uploadDir)
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix: string =
      Date.now().toString() + '-' + Math.round(Math.random() * 1e9).toString()
    const ext = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  },
})

export const upload = multer({ storage })

export const processImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next()
  }

  const filePath = req.file.path
  const outputFilePath = filePath.replace(/(\.[\w\d_-]+)$/i, '_processed$1')

  try {
    const watermark = path.join(__dirname, '../../assets/watermark.png')

    await sharp(filePath)
      .resize(800)
      .composite([{ input: watermark, gravity: 'southeast' }])
      .toFile(outputFilePath)

    fs.unlinkSync(filePath)

    req.file.filename = path.basename(outputFilePath)
    req.file.path = outputFilePath

    next()
  } catch (error) {
    console.error('Image processing error:', error)
    res.status(500).json({ message: 'Error processing image' })
  }
}
