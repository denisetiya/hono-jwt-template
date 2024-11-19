import { Hono } from "hono";
import auth from "./module/auth/auth.controller.js";


const router = new Hono()


router.route('/auth', auth)

export default router