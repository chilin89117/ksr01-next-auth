import {NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import {dbConnect} from '@/configs/db.js'
import User from '@/models/User.js'
import Token from '@/models/Token.js'
import {sendEmail} from '@/utils/sendEmail.js'

// POST request is for sending email
export const POST = async request => {
  await dbConnect()

  try {
    const {email} = await request.json()
    const user = await User.findOne({email})
    if (!user) throw new Error('Email not found. Please try again.')
    await sendEmail({email, emailType: 'resetPassword', userId: user.id})
    return NextResponse.json({message: 'Successfully sent password reset link.'}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }
}

// PUT request is for updating password
export const PUT = async request => {
  // await dbConnect()

  try {
    const {token, password} = await request.json()
    const dbToken = await Token.findOne({token}, '_id userId isValid createdAt').exec()

    // Token not found, throw error
    if (!dbToken) throw new Error('Invalid or expired token. Please try again.')

    // Token 'isValid' flag is false, throw error (flag is true when sent by sendEmail.js)
    if (!dbToken.isValid) throw new Error('Invalid or expired token. Please try again.')

    // Token created more than 5 min. ago, set 'isValid' to false and throw error
    if (Date.now() - dbToken.createdAt.getTime() > 300000) {
      await Token.findByIdAndUpdate(dbToken._id, {isValid: false})
      throw new Error('Invalid or expired token. Please try again.')
    }

    // Get 'userId' from token and update user with new hashed password
    const userId = dbToken.userId
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    await User.findByIdAndUpdate(userId, {password: hashed})
    // Token has been used, set 'isValid' flag to false
    await Token.findByIdAndUpdate(dbToken._id, {isValid: false})

    return NextResponse.json({message: 'Successfully reset password.'}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }
}
