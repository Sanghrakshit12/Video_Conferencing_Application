import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "@/db"
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export const Next_Auth_Config = {
    // pages: {
    //     signIn: "/signin"
    // },
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "username",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "password"
                },
            },
            async authorize(credentials: any) {
                try {
                    if (!credentials?.username || !credentials?.password) {
                        return null;
                    }
                    const existingUser = await db.user.findUnique({
                        where: { username: credentials.username }
                    });
                    if (!existingUser) {
                        console.log("fuck off")
                        return null;
                    }
                    const passwordMatch = await compare(credentials.password, existingUser.password);

                    if (!passwordMatch) {
                        return null;
                    }
                    return {
                        id: `${existingUser.id}`,
                        Name: existingUser.Name,
                        username: existingUser.username
                    }
                }
                catch(err) {
                    console.log("fuck off")
                    return null;
                }
        }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({ token }: any) => {
            console.log(token)
            return token;
        }
    }
}