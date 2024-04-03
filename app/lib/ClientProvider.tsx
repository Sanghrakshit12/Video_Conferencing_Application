"use client";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getToken from "../actions";
interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const videoClient = useInitializeVideoClient();
  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}

function useInitializeVideoClient() {
  const { data: session } = useSession();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );
  useEffect(() => {
    if (!session) {
      setVideoClient(null); 
      return () => {}; 
    }
    console.log("from client", session);
    const streamUser: User = {
      id: session.user.id,
      name: session.user.name!,
    };

    const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
    if (!apiKey) {
      throw new Error("Stream API Key or Secret not Set");
    }
    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: getToken,
    });
    setVideoClient(client);
    return ()=>{
  
      client.disconnectUser()
      setVideoClient(null)
    }
  }, [session]);
 
  return videoClient;
}
