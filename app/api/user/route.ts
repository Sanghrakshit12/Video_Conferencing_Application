import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = await client.user.create({
        data: {
            username: body.username,
            password: body.password
        }
    });

    console.log(user.id);

    return Response.json({ message: "Signed up" });
}