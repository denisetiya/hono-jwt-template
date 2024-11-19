import type { Next, Context } from "hono";
import Res from "../utils/api.response.js";



const serverKey = async(c : Context, next: Next) => {
    
    const keyServer = c.req.header("x-api-key");
    
    if (keyServer !== process.env.API_KEY) {
        return Res(c, 403, "Forbidden", "you are not allowed to access this resource");
    }

    await next();
}

export default serverKey