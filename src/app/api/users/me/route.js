// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config (Video 31)
export const dynamic = 'force-dynamic'

import {NextResponse} from 'next/server'
import {dbConnect} from '@/configs/db.js'
import {validateJWTGetUserId} from '@/utils/tokenValidation.js'
import User from '@/models/User.js'

export const GET = async request => {
  await dbConnect()

  try {
    // Send request object to helper function to extract user id
    const userId = validateJWTGetUserId(request)
    // Find and return user from database
    const user = await User.findById(userId).select('-password')
    return NextResponse.json({data: user, message: 'Successfully fetched current user.'}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }
}
