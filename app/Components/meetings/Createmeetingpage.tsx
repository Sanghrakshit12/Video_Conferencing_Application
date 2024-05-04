"use client";

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
import DescriptionInput from "./DescriptionInput";
import StartTimeInput from "./StartTimeInput";
import ParticipantInput from "./ParticipantInput";
import MeetingLink from "./MeetingLink";
import { RecordSettingsRequestModeEnum } from "@stream-io/video-react-sdk";

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
      const callType = participantInput ? "Private_Meeting" : "default";
      const call = client.call(callType, id);
      const memberEmails = participantInput
        .split(",")
        .map((email) => email.trim());
      const memberIds = await getUserIds(memberEmails);

      const members: MemberRequest[] = memberIds
        .map((id) => ({ user_id: String(id), role: "call_member" }))
        .concat({ user_id: session.user.id, role: "call_member" })
        .filter(
          (v, i, a) => a.findIndex((v2) => v2.user_id === v.user_id) === i,
        );

      const starts_at = new Date(startTimeInput || Date.now()).toISOString();

      await call.getOrCreate({
        data: {
          starts_at,
          members,
          custom: { description: description },
        },
      });
      await call.update({
        custom: { color: "green" },
        settings_override: {
          recording: {
            mode: RecordSettingsRequestModeEnum.DISABLED,
          },
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
    <>
      <div className="flex flex-col items-center space-y-6">
        <div className="mx-auto w-80 space-y-6 rounded-md bg-slate-100 p-5">
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
    </>
  );
}
