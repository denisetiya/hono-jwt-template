import type { Context, Next } from 'hono'


const headerMiddleware = async (c: Context, next: Next) => {
  // Content Security Policy (CSP)
  c.header('Content-Security-Policy', "default-src 'self'; img-src 'self' https:; script-src 'self'; style-src 'self' 'unsafe-inline'")

  // Strict Transport Security (HSTS)
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

  // X-Content-Type-Options
  c.header('X-Content-Type-Options', 'nosniff')


  await next()
}

export default headerMiddleware
