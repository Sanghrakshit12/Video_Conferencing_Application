"use client";

import { pusher} from "@/app/lib/pusher/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Message {
  message: string;
  date: string;
  user?:string;
}

export default function MessageList({}: Message) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: session } = useSession();

  useEffect(() => { 
    const channel = pusher.subscribe("private-chat")
    // channel.bind('pusher:subscription_succeeded', retrieveHistory);
      channel.bind("evt::test", (data: any) => {
            setMessages([...messages, data]);
      });

    return () => {
      channel.unbind();
    };
  }, [messages]);
 
  // function retrieveHistory() {
  //   $.get('/messages').success(function(response) {
  //     // TODO: extract messages from the response
  //   });
  // },
  

  const handleTestClick = async () => {
    let data = await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "test",user:session?.user.name,date: new Date()}),
    });
  };

  return (
    <div className="flex flex-col">
      <button
        className="m-2 w-[240px] rounded bg-slate-600 p-2 hover:bg-slate-500"
        onClick={() => handleTestClick()}
      >
        Test
      </button>

      <div>
        {messages.map((message: any) => (
          <div
            className="m-2 rounded border border-slate-600 p-2"
            key={message.date}
          >
            {message.message}
            <br />
            <p>{message.user}</p>
            {message.date}
          </div>
        ))}
      </div>
    </div>
  );
}
