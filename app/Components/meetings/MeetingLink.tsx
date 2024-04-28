"use client";
import { Call } from "@stream-io/video-react-sdk";
import { useState } from "react";

interface MeetinglLink {
  call: Call;
}

export default function MeetingLink({ call }: MeetinglLink) {
  const meetingLink = `${process.env.NEXTAUTH_URL}/meeting/${call.id}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center gap-2 rounded-full bg-gray-300 px-3 py-2 font-semibold text-gray-800">
          Invitation Link:{" "}
          <a
            target="_blank"
            href={meetingLink}
            className="font-medium text-blue-500 hover:underline"
          >
            {meetingLink}
          </a>
        </span>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={handleCopy}
          className={`rounded-full px-3 py-2 font-semibold text-white ${
            copied
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          style={{ fontSize: "0.9rem" }}
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
