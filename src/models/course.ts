import { Schema, model, Types } from 'mongoose'
import slugify from 'slugify'

export enum CourseLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
}

export interface Course {
  title: string
  slug: string
  description?: string
  price: number
  image: string
  category: string
  level: CourseLevel
  published: boolean
  author: Types.ObjectId
  createdAt: Date
  tags?: string[]
}

const courseSchema = new Schema<Course>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: Object.values(CourseLevel),
    default: CourseLevel.Beginner,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  tags: [
    {
      type: String,
    },
  ],
})

courseSchema.pre('validate', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

export const CourseModel = model<Course>('Course', courseSchema)
