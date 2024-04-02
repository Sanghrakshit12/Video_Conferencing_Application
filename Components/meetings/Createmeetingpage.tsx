"use client";

import { Label } from "@radix-ui/react-label";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "../ui/use-toast";

export default function CreateMeetingPage() {
  const { data: session } = useSession();
  const client = useStreamVideoClient();

  const [description, setDescription] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [participantInput, setparticipantInput] = useState("");
  const [call, setCall] = useState<Call>();

  async function createMeeting() {
    if (!session?.user.name || !client) {
      return;
    }
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      await call.getOrCreate({
        data: {
          custom: { description: description },
        },
      });
      setCall(call);
    } catch (e) {
      console.log(e);
      toast({
        title: "Oops! Something Went Wrong",
        description: "Please Try Again Later",
      });
    }
  }

  if (!session?.user.name || !client) {
    return <Loader2 className="mx-auto animate-spin" />;
  }
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="mx-auto w-80 space-y-6 rounded-md bg-purple-200 p-5">
        <h2 className="text-xl font-bold">Create A New Meeting</h2>
        <DescriptionInput value={description} onchange={setDescription} />
        <StartTimeInput value={startTimeInput} onchange={setStartTimeInput} />
        <ParticipantInput
          value={participantInput}
          onChange={setparticipantInput}
        />
        <button className="w-full" onClick={createMeeting}>
          Create Meeting
        </button>
      </div>
      {call && <MeetingLink call={call} />}
    </div>
  );
}
interface DescriptionInputProps {
  value: string;
  onchange: (value: string) => void;
}

function DescriptionInput({ value, onchange }: DescriptionInputProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting Info</div>
      <label>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            onchange("");
          }}
        />
        Add Description
      </label>
      {active && (
        <Label className="block space-y-1">
          <span className="font-medium">Description</span>
          <textarea
            value={value}
            onChange={(e) => {
              onchange(e.target.value);
            }}
            maxLength={500}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </Label>
      )}
    </div>
  );
}

interface StartTimeInputProps {
  value: string;
  onchange: (value: string) => void;
}

function StartTimeInput({ value, onchange }: StartTimeInputProps) {
  const [active, setActive] = useState(false);
  const datetimelocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 16);
  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting Start:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onchange("");
          }}
        />
        Start Meeting Immediately
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
            onchange(datetimelocalNow);
          }}
        />
        Start Meeting At date/time
      </label>
      {active && (
        <Label className="block space-y-1">
          <span className="font-medium">Start Time</span>
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => {
              onchange(e.target.value);
            }}
            min={datetimelocalNow}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </Label>
      )}
    </div>
  );
}

interface ParticipantInputProps {
  value: string;
  onChange: (value: string) => void;
}

function ParticipantInput({ value, onChange }: ParticipantInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Participants:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onChange("");
          }}
        />
        Everyone with Link Can Join
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
          }}
        />
        Private Meetings
      </label>
      {active && (
        <Label className="block space-y-1">
          <span className="font-medium">Participants Email</span>
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            placeholder="Enter Participants Email Address Seprated by Commas"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </Label>
      )}
    </div>
  );
}

interface MeetinglLink {
  call: Call;
}

function MeetingLink({ call }: MeetinglLink) {
  const meetingLink = `${process.env.NEXTAUTH_URL}/meeting/${call.id}`;
  return <div className="text-center">{meetingLink}</div>;
}