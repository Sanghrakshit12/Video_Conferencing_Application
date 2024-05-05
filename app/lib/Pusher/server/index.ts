import PusherServer from "pusher";

export const pusherServer = new PusherServer({
  appId: process.env.APP_ID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: "ap2",
  useTLS: true,
});
