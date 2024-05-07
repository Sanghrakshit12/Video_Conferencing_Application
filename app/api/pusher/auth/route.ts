// import { nanoid } from "nanoid"

import { pusherServer } from "@/app/lib/Pusher/server";

export async function POST(req: Request) {
  //authenticating pusher perms
  const data = await req.text();

  // Extracting the socketId and channelName from the
  // search params when making an authorized request.
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  //   const id = nanoid()

  //metadata for the request maker
  //   const presenceData = {
  //     user_id: id,
  //     user_data: { user_id: id },
  //   }

  const auth = pusherServer.authorizeChannel(
    socketId,
    channelName,
    // presenceData
  );
  return new Response(JSON.stringify(auth));
}
