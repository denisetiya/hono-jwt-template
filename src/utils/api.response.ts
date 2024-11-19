import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'

const Res = (
  c: Context,
  status: StatusCode,
  message: string,
  error: any = null,
  content: any = null,
  meta: any = null
) => {
    return c.json({
    message,
    ...(error && { error }), 
    ...(content && { content }), 
    ...(meta && { meta }),
    }, status)
}

export default Res
