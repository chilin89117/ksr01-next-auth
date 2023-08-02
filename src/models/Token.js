import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    emailType: {
      type: String,
      enum: ['emailVerification', 'resetPassword'],
      required: true
    },
    isValid: {
      type: Boolean,
      default: false
    }
  },
  {timestamps: true}
)

// Check if model is already created
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/models/Pet.js
export default mongoose.models.Token || mongoose.model('Token', tokenSchema, 'ksr01tokens')
