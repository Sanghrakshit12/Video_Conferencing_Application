import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "@/db"
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const Next_Auth_Config: NextAuthOptions = {
    pages: {
        signIn: "/signin"
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "username",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "username"
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "password"
                },
            },
            async authorize(credentials): Promise<any> {
                try {
                    if (!credentials?.username || !credentials?.password) {
                        return null;
                    }
                    const existingUser = await db.user.findUnique({
                        where: { username: credentials.username }
                    });
                    if (!existingUser) {
                        console.log("User Dosen't Exist")
                        return null;
                    }
                    const passwordMatch = await compare(credentials.password, existingUser.password);

                    if (!passwordMatch) {
                        return null;
                    }
                    return {
                        id: `${existingUser.id}`,
                        name: existingUser.Name,
                        email: existingUser.username
                    }
                }
                catch (err) {
                    console.log("Error in Signin")
                    return null;
                }
            },

        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        }
    }
}
