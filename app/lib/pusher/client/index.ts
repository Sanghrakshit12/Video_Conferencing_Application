"use client";
import Pusher from "pusher-js";
export const pusher = new Pusher("af6b09f955e311762e23" , {
  cluster: "ap2",
  authEndpoint: "/api/pusher/auth", 
});