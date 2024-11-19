import type { Context, Next } from 'hono'
import Res from '../utils/api.response.js'
import jwt from 'jsonwebtoken'
import { getCookie, setCookie } from 'hono/cookie'
import prisma from '../utils/prisma.client.js'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

export const authenticateJWT = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization') || getCookie(c, 'access_token')

  const path = c.req.path

  if (
    path.startsWith('/auth') ||
    (c.req.method === 'GET' && path.startsWith('/categories')) ||
    (c.req.method === 'GET' && path.startsWith('/products')) ||
    (c.req.method === 'GET' && path.startsWith('/articles'))
  ) {
    return await next()
  }

  if (authHeader) {
    const token = authHeader.toString().split(' ')[1]

    if (token) {
      try {
        jwt.verify(token, ACCESS_TOKEN_SECRET)
        // Token valid, lanjut ke handler berikutnya
        return await next()
      } catch (err) {
        // Jika token akses tidak valid, cek refresh token
        const refreshToken =c.req.header('x-refresh-token') || getCookie(c, 'refresh_token')

        if (!refreshToken) {
          return Res(c, 401, 'Unauthorized', 'you are not allowed to access this resource')
        }

        try {
          const storedToken = await prisma.token.findFirst({
            where: { refresh: refreshToken.toString() },
          })
          if (!storedToken) {
            return Res(c, 401, 'Unauthorized', 'Invalid refresh token')
          }

          jwt.verify(refreshToken.toString(), REFRESH_TOKEN_SECRET, async (err: any, decoded: any) => {
            if (err) {
              return Res( c, 401, 'Unauthorized', 'Invalid refresh token' )
            }

    
            const newAccessToken = jwt.sign(
              { id: decoded.id, email: decoded.email },
              ACCESS_TOKEN_SECRET,
              { expiresIn: '15m' }
            )
            const newRefreshToken = jwt.sign(
              { id: decoded.id, email: decoded.email },
              REFRESH_TOKEN_SECRET,
              { expiresIn: '7d' }
            )

            await prisma.token.update({
              where: { userId: decoded.id },
              data: { refresh: newRefreshToken },
            })

            setCookie(c, 'accessToken', 'Bearer ' + newAccessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'Strict',
              maxAge: 15 * 60 * 1000,
            })

            setCookie(c, 'refreshToken', newRefreshToken, {
              httpOnly: true,
              sameSite: 'Strict',
              secure: true,
              maxAge: 7 * 24 * 3600,
            } )

            

            await next()
          })
        } catch (error) {
          return Res(c, 401, 'Unauthorized', 'Invalid refresh token')
        }
      }
    } else {
      return Res(c, 401, 'Unauthorized', 'you are not allowed to access this resource')
    }
  } else {
    return Res(c, 401, 'Unauthorized', 'you are not allowed to access this resource')
  }
}
