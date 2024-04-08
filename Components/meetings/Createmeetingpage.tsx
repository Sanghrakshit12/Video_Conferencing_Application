"use client";

import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { getUserIds } from "@/app/actions";
import Button from "../Button";

export default function CreateMeetingPage() {
  const { data: session } = useSession();
  const client = useStreamVideoClient();

  const [description, setDescription] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [participantInput, setparticipantInput] = useState("");
  const [call, setCall] = useState<Call>();

  async function createMeeting() {
    if (!session?.user.name || !client) {
     return
    }
    try {
      const id = crypto.randomUUID();
      // const callType = participantInput ? "Private_Meeting" : "default";
      const call = client.call("default", id);
      // const memberEmails = participantInput
      //   .split(",")
      //   .map((email) => email.trim());
      // const memberIds = await getUserIds(memberEmails);
      // if (!Array.isArray(memberIds)) {
      //   throw new Error("getUserIdsByEmails did not return an array");
      // }
      // const members: MemberRequest[] = memberIds
      //   .map((id) => ({ user_id: id, role: "call_member" }))
      //   .concat({ user_id: session.user.id, role: "call_member" })
      //   .filter(
      //     (v, i, a) => a.findIndex((v2) => v2.user_id === v.user_id) === i,
      //   );

      // const starts_at = new Date(startTimeInput || Date.now()).toISOString();

      await call.getOrCreate({
        data: {
          // starts_at,
          // members,
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
        <Button className="w-full" onClick={createMeeting}>
          Create Meeting
        </Button>
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="text-center">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center gap-2 rounded-full bg-green-400 px-3 py-2 font-semibold text-white">
          Invitation Link:{" "}
          <a target="_blank" href={meetingLink} className="font-medium">
            {meetingLink}
          </a>
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={handleCopy}
          className={`rounded-full px-3 py-2 font-semibold text-white transition-colors ${
            copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          style={{ fontSize: '0.9rem' }}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}


