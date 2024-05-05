"use client";

// interface MessageFieldProps {
//   roomId: string
// }
// { roomId }: MessageFieldProps in brackets

const MessageField = () => {
  let input = "";

  const sendMessage = async (text: string) => {
    await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  };

  return (
    <div className="flex gap-2">
      type a new message:
      <input onChange={({ target }) => (input = target.value)} />
      <button onClick={() => sendMessage(input || "")}>send</button>
    </div>
  );
};

export default MessageField;
