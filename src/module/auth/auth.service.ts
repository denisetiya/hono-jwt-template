import prisma from "../../utils/prisma.client.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

// Interface untuk login dan register
export interface iLogin {
    email: string;
    password: string;
}

export interface iRegister extends iLogin {
    username: string;
    name: string;
}
const secret = process.env.ACCESS_TOKEN_SECRET 

// Fungsi untuk login
export const handleLogin = async (data: iLogin) => {
    try {
        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email: data.email },
            include: { token: true }
        });

        // Jika user tidak ditemukan atau password tidak cocok
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new Error("Invalid email or password");
        }

        const playload = {
            email: user.email,
            role: user.role,
        };

        // Generate JWT access token dan refresh token
        const token = jwt.sign(
            playload, secret as string,
            { expiresIn: '15m' } // 15 menit
        );

        const refreshToken = jwt.sign(
            playload, secret as string,
            { expiresIn: '7d' } // 7 hari
        );

        // Simpan atau update refresh token di database
        if (user.token && user.token.length > 0 && user.token[0].refresh) {
            await prisma.token.update({
                where: { userId: user.id },
                data: { refresh: refreshToken }
            });
        } else {
            await prisma.token.create({
                data: { userId: user.id, refresh: refreshToken }
            });
        }

        const userData = {
            email: user.email,
            role: user.role,
            username: user.username,
            nama: user.nama,
        };

        const tokenData = { token, refreshToken };

        return { tokenData, userData };

    } catch (error) {
        console.error("Login error:", error);
        throw new Error( "An error occurred during login.");
    }
};

// Fungsi untuk register
export const handleRegister = async ({ email, password, username, name }: iRegister) => {
    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error("Email already in use");
        }

        // Hash password sebelum disimpan
        const hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
                username,
                nama: name
            }
        });

        if (!user) {
            throw new Error("Failed to create user");
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.nama,
            role: user.role
        };

    } catch (error) {
        console.error("Registration error:", error);
        throw new Error( "An error occurred during registration.");
    }
};
