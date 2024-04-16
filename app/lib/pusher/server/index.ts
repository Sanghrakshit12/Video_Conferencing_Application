import PusherServer from "pusher";
let pusherInstance: PusherServer | null = null;

export const getPusherInstance = () => {
  if (!pusherInstance) {
    pusherInstance = new PusherServer({
      appId: "1788050",
      key: "af6b09f955e311762e23",
      secret: "c8211257c07ac2ddbfee",
      cluster: "ap2",
      useTLS: true,
    });
  }
  return pusherInstance;
};