"use client";
import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
    const session=useSession();

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
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );

  return videoClient;
}
