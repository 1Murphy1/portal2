import { CallbackError, model, Model, Schema, Types } from 'mongoose'
import bcrypt from 'bcrypt'

enum Role {
  Teacher = 'teacher',
  Student = 'student',
}

interface IUser {
  firstName: string
  lastName: string
  username: string
  password: string
  role: Role
  favorites: Types.ObjectId[]
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>
}

type UserModel = Model<IUser, object, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['teacher', 'student'],
    required: true,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(this.password, salt)

    this.password = hash

    next()
  } catch (err) {
    return next(err as CallbackError)
  }
})

userSchema.method(
  'comparePassword',
  async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password)
  }
)

export const UserModel = model<IUser, UserModel>('User', userSchema)
