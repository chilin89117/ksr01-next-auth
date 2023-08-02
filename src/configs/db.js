import mongoose from 'mongoose'

export const dbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)
    const connection = mongoose.connection
    connection.on('connected', () => console.log('Connected to MongoDB...'))
    connection.on('error', err => console.log('MongoDB connection error:', err))
  } catch (error) {
    throw new Error(error.message)
  }
}
