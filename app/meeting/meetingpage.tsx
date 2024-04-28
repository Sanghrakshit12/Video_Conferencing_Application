"use client";

import {
  StreamCall,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import useLoadCall from "../hook/useLoadCall";
import { useSession } from "next-auth/react";
import useStreamCall from "../hook/useStreamCall";
import Link from "next/link";
import { buttonClassName } from "../Components/Button";
import { useState } from "react";
import SetupUi from "../Components/meetings/SetupUi";
import CallUi from "../Components/meetings/CallUi";

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
      <div className="flex items-center justify-center">
      <div className="max-w-lg rounded-lg bg-white p-8 shadow-md">
        <p className="text-center">
        You Are Not Allowed To Join This Meeting
          <span className="font-bold text-red-600"> - NexMeet</span>
        </p>
      </div>
    </div>
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
    call.join();
    setSetupComplete(true);
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
    <div className="space-y-4">
      {description && (
        <div className="flex items-center justify-center">
          <div className="max-w-lg rounded-lg bg-white p-8 shadow-md">
            <p className="text-center">
              Meeting Description:
              <span className="font-bold text-red-600">{description}</span>
            </p>
          </div>
        </div>
      )}
      {setupComplete ? (
        <CallUi />
      ) : (
        <SetupUi onSetupComplete={handlesetupComplete} />
      )}
    </div>
  );
}

function UpcomingMeetingScreen() {
  const call = useStreamCall();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-md">
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
      </div>
    </div>
  );
}

function MeetingEndedScreen() {
  const call = useStreamCall();
  call.camera.disable();
  call.microphone.disable();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-col items-center gap-6">
          <p className="font-bold">The Meeting Has Ended</p>
          <Link href="/" className={buttonClassName}>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
