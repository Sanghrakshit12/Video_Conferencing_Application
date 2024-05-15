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

export default function ClientProvider({ ch
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
      return;
    }
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
      tokenProvider: session ? getToken : undefined,
    });
    setVideoClient(client);
    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [session, session?.user.id, session?.user.name]);
  return videoClient;
}
