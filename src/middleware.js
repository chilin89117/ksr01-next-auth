import {NextResponse} from 'next/server'

// Middleware to protect routes
export const middleware = request => {
  // Get value of token from request object
  const token = request.cookies.get(process.env.TOKEN_NAME)?.value || ''

  const {pathname} = request.nextUrl
  const isPublic = pathname === '/login' || pathname === '/register'
  const isVerifyReset = pathname === '/verify-email' || pathname === '/reset-password'

  // Redirect to '/login' if there's no token and 'pathname' is not '/login' or '/register',
  // and if 'pathname' is not '/verify-email' or '/reset-password'
  if (!token && !isPublic && !isVerifyReset) return NextResponse.redirect(new URL('/login', request.url))

  // Redirect to '/' if there is a token and 'pathname' is '/login' or '/register',
  // but do not redirect if 'pathname' is '/verify-email' or '/reset-password'
  if (token && isPublic && !isVerifyReset) return NextResponse.redirect(new URL('/', request.url))

  // Continue to next middleware for all other cases
  return NextResponse.next()
}

// Matcher allows filter of Middleware to run on specific paths
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
  matcher: ['/', '/login', '/register', '/profile', '/verify-email', '/reset-password']
}
