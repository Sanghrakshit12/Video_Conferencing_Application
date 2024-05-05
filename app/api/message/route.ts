// import { db } from "@/db"
// import { messages } from "@/db/schema"
// import { nanoid } from "nanoid"

import { pusherServer } from "@/app/lib/Pusher/server";

export async function POST(req: Request) {
  // const { text, roomId } = await req.json()
  const { text } = await req.json();

  //   pusherServer.trigger(roomId, "incoming-message", text)
  try {
    pusherServer.trigger("private-chat", "evt::test", text);
    //   await db.insert(messages).values({ id: nanoid(), text, chatRoomId: roomId })

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false }));
  }
}
