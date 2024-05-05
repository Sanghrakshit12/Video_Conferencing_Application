"use server"

import { getServerSession } from "next-auth"
import { Next_Auth_Config } from "./lib/auth"
import { StreamClient } from "@stream-io/node-sdk"
import db from "@/db"

export default async function getToken() {
    const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY
    const apiSecret = process.env.STREAM_VIDEO_API_SECRET

    const session = await getServerSession(Next_Auth_Config)
    if (!streamApiKey || !apiSecret) {
        throw new Error("Stream API Key or Secret not Set")
    }
    const user = session?.user?.id
    if (!user) {
        throw new Error("User Not Authenticated")
    }

    const streamClient = new StreamClient(streamApiKey, apiSecret)
    const expireationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(session.user.id, expireationTime, issuedAt)
    return token
}

export async function getUserIds(emailadresses: string[]) {
    try {
        const users = await db.user.findMany({
            where: {
                username: {
                    in: emailadresses
                }
            },
            select: {
                id: true
            }
        })
        const userid = users.map(user => user.id)
        return userid;
    }
    catch (e) {
        console.log("Error in Getting ID's")
        throw new Error()
    }
}