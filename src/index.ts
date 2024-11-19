import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import headerMiddleware from './middleware/header.middleware.js'
import rateLimiter from './middleware/rate.limiter.js'
import serverKey from './middleware/server.key.js'
import { authenticateJWT } from './middleware/jwt.auth.js'
import auth from './module/auth/auth.controller.js'
import router from './router.js'

const app = new Hono()


app.use(headerMiddleware)


app.use(
  rateLimiter({
    windowMs: 1000, 
    max: 8,
    message: 'Terlalu banyak permintaan, silakan coba lagi nanti.',
  })
)

app.use(
  rateLimiter({
    windowMs: 30 * 60 * 1000,
    max: 500,
    message: 'Anda telah melebihi batas request dalam 30 menit.',
  })
)

app.use(serverKey)
app.use('/v1',authenticateJWT)

app.route('/v1',router)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
