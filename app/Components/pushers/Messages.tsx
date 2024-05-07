"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/app/lib/Pusher/client";

// interface MessagesProps {
//   initialMessages: {
//     text: string
//     id: string
//   }[]
//   roomId: string
// }
// in brackets { initialMessages, roomId }: MessagesProps
interface MessagesProps {
  text: string;
  date: string;
  user?: string;
}

const Messages = ({}: MessagesProps) => {
  const [incomingMessages, setIncomingMessages] = useState<MessagesProps[]>([]);

  useEffect(() => {
    // subscribe the current room to listen for pusher events.
    // pusherClient.subscribe(roomId)

    // when an "incoming-message" event is triggered
    // (shown in the previous code block)
    // make sure to update the messages state in real-time for all users.
    // pusherClient.bind("incoming-message", (text: string) => {
    //   setIncomingMessages((prev) => [...prev, text])
    // })

    pusherClient.subscribe("private-chat");
    pusherClient.bind("evt::test", (data: any) => {
      console.log(data)
      setIncomingMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      //   pusherClient.unsubscribe(roomId)
      pusherClient.unbind("evt::test");
    };
  }, [incomingMessages]);

  return (
    <div>
      {/* {initialMessages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))} */}
      {incomingMessages.map((message: any) => (
        <div key={message.date}>
          <p>{message.user}</p>
          <p>{message.date}</p>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
