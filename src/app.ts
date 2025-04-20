import express from 'express'
import { connectDB } from './config/db'
import dotenv from 'dotenv'
import { authRoutes } from './routes/authRoutes'
import { pingRoutes } from './routes/pingRoutes'
import { userRoutes } from './routes/userRoutes'
import { courseRoutes } from './routes/courseRoutes'



dotenv.config()
const PORT = process.env.PORT || 3000

const api = '/api'

connectDB()

const app = express()
app.use(express.json())

app.use(`${api}/auth`, authRoutes)
app.use(api, pingRoutes)
app.use(` ${api}/user`, userRoutes)
app.use(`${api}`, courseRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
