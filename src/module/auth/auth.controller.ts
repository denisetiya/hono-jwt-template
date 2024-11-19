import { Hono } from "hono";
import dotenv from "dotenv";
import { handleLogin, handleRegister } from "./auth.service.js";
import { setCookie } from "hono/cookie";
import Res from "../../utils/api.response.js";
dotenv.config();

const auth = new Hono()


auth.post('/login', async (c) => {
    const { email, password } = await c.req.json();
  
    try {
        const { tokenData, userData } = await handleLogin({email, password});

        setCookie(c, 'access_token',"Bearer "+ tokenData.token,{
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expires: new Date(Date.now() + 15 * 60 * 60 * 1000),
        } );
        
        setCookie(c, 'refresh_token', tokenData.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        

        return Res(c, 200, 'Login success', null, userData, tokenData);

    } catch (error) {
        console.error(error);
        return Res(c, 500, 'Internal server error');
    }
});

auth.post('/register', async (c) => {
    const { email, password, username, name } = await c.req.json();

    try {
        const  user = await handleRegister({email, password, username, name});

        if (!user) {
            return Res(c, 500, 'Some thing wrong');
        }

        return Res(c, 200, 'Register success', null, user);
    } catch (error) {
        
    }
})

export default auth;

