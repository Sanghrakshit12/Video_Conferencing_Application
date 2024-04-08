"use client";
import { Call } from "@stream-io/video-react-sdk";
import { useState } from "react";
import GetLinkToMAil from "./getlink";

interface MeetinglLink {
  call: Call;
}

export default function MeetingLink({ call }: MeetinglLink) {
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
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={handleCopy}
          className={`rounded-full px-3 py-2 font-semibold text-white transition-colors ${
            copied
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          style={{ fontSize: "0.9rem" }}
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      <a
        href={GetLinkToMAil(
          meetingLink,
          call.state.startedAt,
          call.state.custom.description,
        )} target="_blank" className="text-blue-500 hover:underline"
      >Send Email Invitation</a>
    </div>
  );
}
