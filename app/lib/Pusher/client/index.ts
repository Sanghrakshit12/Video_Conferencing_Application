import PusherClient from "pusher-js";

export const pusherClient = new PusherClient("af6b09f955e311762e23", {
  cluster: "ap2",
  authEndpoint: "/api/pusher/auth",
  //   authTransport: "ajax",
  //   auth: {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
});
