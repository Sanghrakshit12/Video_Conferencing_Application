"use client";

import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import useLoadCall from "../hook/useLoadCall";
import { useSession } from "next-auth/react";
import useStreamCall from "../hook/useStreamCall";
import Link from "next/link";
import { buttonClassName } from "@/Components/Button";
import { useState } from "react";
import SetupUi from "@/Components/meetings/SetupUi";

interface MeetingPageProps {
  id: string;
}

export default function MeetingPage({ id }: MeetingPageProps) {
  const { call, callLoading } = useLoadCall(id);
  const { data: session } = useSession();
  if (!session || callLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }
  if (!call) {
    return <p className="text-center font-bold">Call Not Found</p>;
  }
  const notALlowed =
    call.type === "Private_Meeting" &&
    (!session ||
      !call.state.members.find((m) => m.user.id === session?.user.id));
  if (notALlowed) {
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
      <StreamTheme>
        <MeetingScreen />
      </StreamTheme>
    </StreamCall>
  );
}

function MeetingScreen() {
  const call = useStreamCall();
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const [setupComplete, setSetupComplete] = useState(false);
  async function handlesetupComplete() {
    call.join()
    setSetupComplete(true)
  }

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();
  const callsinfuture = callStartsAt && new Date(callStartsAt) > new Date();
  const callhasended = !!callEndedAt;
  if (callhasended) {
    return <MeetingEndedScreen />;
  }
  if (callsinfuture) {
    return <UpcomingMeetingScreen />;
  }
  const description = call.state.custom.description;
  return (
    <div className="space-y-6">
      {description && (
        <p className="text-center">
          Meeting Description:<span className="font-bold">{description}</span>
        </p>
      )}
      {setupComplete ? (
        <SpeakerLayout />
      ) : (
        <SetupUi onSetupComplete={handlesetupComplete} />
      )}
    </div>
  );
}

function UpcomingMeetingScreen() {
  const call = useStreamCall();
  return (
    <div className="flex flex-col items-center gap-6">
      <p>
        This Meeting Has Not Started yet. it will Start At{" "}
        <span className="font-bold">
          {call.state.startsAt?.toLocaleString()}
        </span>
      </p>
      {call.state.custom.description && (
        <p>
          Description:{" "}
          <span className="font-bold">{call.state.custom.description}</span>
          <Link href="/" className={buttonClassName}>
            Go Home
          </Link>
        </p>
      )}
    </div>
  );
}

function MeetingEndedScreen() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">The Meeting Has Ended</p>
      <Link href="/" className={buttonClassName}>
        Go Home
      </Link>
    </div>
  );
}

// return (
//   <button style={{
//     position: "absolute",
//     top: "45%",
//     left: "30%",
//     transform: "translate(-50%, -50%)",
//     zIndex: 1
//   }} className="flex  gap-2 rounded-full bg-blue-500 px-3 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
//     onClick={async () => {
//       const call = client?.call("Private_Meeting", id);
//       await call?.join();
//       setCall(call);
//     }}
//   >
//  Join Meeting
//   </button>
// );
