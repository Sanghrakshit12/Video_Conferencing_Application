"use client";

import { Call, CallControls, SpeakerLayout, StreamCall, StreamTheme, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface MeetingPageProps {
  id: string;
}

export default function MeetingPage({ id }: MeetingPageProps) {
  const [call, setCall] = useState<Call>();
  const client = useStreamVideoClient();
  if (!client) {
    return  <Loader2 className="mx-auto animate-spin" />;
  }
  if (!call) {
    return (
      <button style={{
        position: "absolute",
        top: "45%",
        left: "30%",
        transform: "translate(-50%, -50%)",
        zIndex: 1
      }} className="flex  gap-2 rounded-full bg-blue-500 px-3 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
        onClick={async () => {
          const call = client?.call("default", id);
          await call?.join();
          setCall(call);
        }}
      >
     Join Meeting
      </button>
    );
  }
  return (
    <StreamCall call={call}>
    <StreamTheme className="space-y-3">
        <SpeakerLayout />
        <CallControls />
    </StreamTheme>
    </StreamCall>
  )
}
