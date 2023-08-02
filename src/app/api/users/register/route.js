import {NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import {dbConnect} from '@/configs/db.js'
import User from '@/models/User.js'
import {sendEmail} from '@/utils/sendEmail.js'

export const POST = async request => {
  await dbConnect()

  try {
    const reqBody = await request.json()

    const userExists = await User.findOne({email: reqBody.email})
    if (userExists) throw new Error('Email has already been registered.')

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(reqBody.password, salt)
    reqBody.password = hashed // Replace plain-text password with hashed password

    const newUser = new User(reqBody)
    await newUser.save()

    await sendEmail({email: newUser.email, emailType: 'emailVerification', userId: newUser.id})

    return NextResponse.json({message: 'Successfully registered. Check email to verify.'}, {status: 201})
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }
}
