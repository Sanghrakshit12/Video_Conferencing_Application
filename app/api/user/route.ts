import { NextRequest } from "next/server";
import prisma from "@/db";
import { hash } from "bcrypt";
import * as z from 'zod';

interface BodyType {
    Name: string
    username: string,
    password: string
}

const UserSchema = z.object({
    Name: z.string().min(1, "Required"),
    username: z.string().min(1, {
        message: "email is Required"
    }).email('Invalid email'),
    password: z.string().min(8, { message: "password must contain atleat 8 character" })
})


export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { Name, username, password }: BodyType = UserSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (existingUser) {
            return Response.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                Name,
                username,
                password:hashedPassword
            }
        });

        return Response.json({ user: newUser, message: "Signed up Successfully", status: 201 });
    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return Response.json({ error: "An error occurred while creating user" }, { status: 500 });
    }
}
