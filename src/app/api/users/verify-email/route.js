import {NextResponse} from 'next/server'
import {dbConnect} from '@/configs/db.js'
import User from '@/models/User.js'
import Token from '@/models/Token.js'

export const POST = async request => {
  await dbConnect()

  try {
    const {token} = await request.json()
    const dbToken = await Token.findOne({token}, '_id userId isValid createdAt')

    // Token not found, throw error
    if (!dbToken) throw new Error('Invalid or expired token. Please try again.')

    // Token 'isValid' flag is false, throw error (flag is true when sent by sendEmail.js)
    if (!dbToken.isValid) throw new Error('Invalid or expired token. Please try again.')

    // Token created more than 5 min. ago, set 'isValid' to false and throw error
    if (Date.now() - dbToken.createdAt.getTime() > 300000) {
      await Token.findByIdAndUpdate(dbToken._id, {isValid: false})
      throw new Error('Invalid or expired token. Please try again.')
    }

    // Update user's 'isEmailVerified' to true
    const userId = dbToken.userId
    await User.findByIdAndUpdate(userId, {isEmailVerified: true})
    // Token has been used, set 'isValid' flag to false
    await Token.findByIdAndUpdate(dbToken._id, {isValid: false})

    return NextResponse.json({message: 'Email verified.'}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }
}
