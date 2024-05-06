"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

// interface MessageFieldProps {
//   roomId: string
// }
// { roomId }: MessageFieldProps in brackets

const MessageField = () => {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  function timeAgo(date: Date) {
    const now = new Date();
    const secondsAgo = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutesAgo = Math.round(secondsAgo / 60);
    const hoursAgo = Math.round(minutesAgo / 60);
    const daysAgo = Math.round(hoursAgo / 24);

    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else {
      return `${daysAgo} days ago`;
    }
  }

  const sendMessage = async (msg: string) => {
    await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: msg,
        user: session?.user?.name,
        date: timeAgo(new Date()),
      }),
    });
  };

  return (
    <div className="flex gap-2">
      type a new message:
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button
        onClick={() => {
          sendMessage(message || "");
          setMessage("");
        }}
      >
        send
      </button>
    </div>
  );
};

export default MessageField;
