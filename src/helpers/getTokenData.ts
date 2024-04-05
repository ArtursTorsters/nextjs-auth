import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
//saving users data

export const getTokenData = async (request: NextRequest) => {
  try {
    // Extract token from request cookies
    const token = request.cookies.get('token')?.value || ''
    console.log('token', token)
    if (!token) {
      return 'no token found'
    }
    // Verify token using JWT library
    const tokenData = await jwt.verify(token, process.env.JWT_TOKEN_SECRET!)
    console.log('tokenData', tokenData)

    return tokenData
  } catch (error) {
    console.error(error)
    return null
  }
}
