import {NextResponse} from 'next/server'

export const POST = () => {
  try {
    const response = NextResponse.json({message: 'Successfully logged out.'}, {status: 200})

    // Clear cookie/token
    response.cookies.delete(process.env.TOKEN_NAME)
    return response
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }
}
