import jwt from 'jsonwebtoken'

// Helper function to validate token and return user id, used by /api/users/me endpoint
export const validateJWTGetUserId = request => {
  try {
    // Get value of token from request object
    const tokenValue = request.cookies.get(process.env.TOKEN_NAME)?.value || ''
    // Decode token to get user id
    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET)
    return decodedToken.id
  } catch (error) {
    throw new Error(error.message)
  }
}
