"use server"

import { getServerSession } from "next-auth"
import { Next_Auth_Config } from "./lib/auth"
import { StreamClient } from "@stream-io/node-sdk"

export default async function getToken() {
    const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY
    const apiSecret = process.env.STREAM_VIDEO_API_SECRET

    const session = await getServerSession(Next_Auth_Config)
    if (!streamApiKey || !apiSecret) {
        throw new Error("Stream API Key or Secret not Set")
    }
    const user = session?.user?.id
    console.log(user)
    if (!user) {
        throw new Error("ser Not Authenticated")
    }

    const streamClient = new StreamClient(streamApiKey, apiSecret)
    const expireationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(session.user.id, expireationTime, issuedAt)
    console.log("Successfully created Token",token)
    return token
}