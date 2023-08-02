import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxlength: [12, 'name can not exceed 12 characters.'],
      minlength: [2, 'name must be at least 2 characters.'],
      required: [true, 'name is required.']
    },
    email: {
      type: String,
      required: [true, 'email is required.'],
      unique: [true, 'email must be unique.']
    },
    password: {
      type: String,
      required: [true, 'password is required.']
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {timestamps: true}
)

// Check if model is already created
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/models/Pet.js
export default mongoose.models.User || mongoose.model('User', userSchema, 'ksr01users')
