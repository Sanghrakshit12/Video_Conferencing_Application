import { NextResponse } from 'next/server'
import { getPusherInstance } from '@/app/lib/pusher/server';
const pusherServer = getPusherInstance();

export async function POST(req: Request, res: Response) {
    try {
        const { message, user, date } = await req.json()
        await pusherServer.trigger(
            'private-chat',
            "evt::test",
            {
                message,
                user,
                date
            }
        )

        return NextResponse.json({ message: "Sockets tested" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to test sockets", error: error }, { status: 500 })  
}
}