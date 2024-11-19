import type { Context, Next } from 'hono'
import Res from '../utils/api.response.js'

const blockedIPs: Set<string> = new Set()

const isBlocked = (ip: string): boolean => blockedIPs.has(ip)

// Rate limiter middleware
const rateLimiter = (options: {
  windowMs: number
  max: number
  message?: string
}) => {
  const requests: Map<string, { count: number; resetTime: number }> = new Map()

  return async (c: Context, next: Next) => {
    const ip = c.req.header('x-forwarded-for') || c.req.header('remote-addr') || 'unknown'

    if (isBlocked(ip)) {
      return Res(c, 429, 'Too many requests, please try again later.')
    }

    const currentTime = Date.now()
    const record = requests.get(ip) || { count: 0, resetTime: currentTime + options.windowMs }

    if (currentTime > record.resetTime) {
      record.count = 0
      record.resetTime = currentTime + options.windowMs
    }

    record.count++

    if (record.count > options.max) {
      blockedIPs.add(ip)
      console.log(`IP ${ip} has been blocked due to exceeding request limits.`)
      return Res(c, 429, 'Too many requests, please try again later.')
    }

    requests.set(ip, record)
    await next()
  }
}

export default rateLimiter
