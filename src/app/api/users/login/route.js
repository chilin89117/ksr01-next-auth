import {NextResponse} from 'next/server'
// import {cookies} from 'next/headers'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {dbConnect} from '@/configs/db.js'
import User from '@/models/User.js'

export const POST = async req => {
  await dbConnect()

  try {
    const reqBody = await req.json()

    const user = await User.findOne({email: reqBody.email})
    if (!user) throw new Error('Invalid credentials.')

    const isValidPassword = await bcrypt.compare(reqBody.password, user.password)
    if (!isValidPassword) throw new Error('Invalid credentials.')

    if (!user.isEmailVerified) throw new Error('Email has not been verified.')

    const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    // cookies().set('ksr01', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   path: '/',
    //   sameSite: 'strict',
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10) // 10 days
    // })

    const response = NextResponse.json({message: 'Successfully logged in.'}, {status: 200})

    response.cookies.set(process.env.TOKEN_NAME, token, {
      httpOnly: true,
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 // 1d
    })

    return response
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }
}
