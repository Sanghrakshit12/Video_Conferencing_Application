import MeetingButton from "@/Components/meetings/meetingbutton";
import MessageList from "@/Components/meetings/messageList";

export default function Home() {
  const messages = [
    { message: "Hello!", date: "2024-04-16" },
    { message: "How are you?", date: "2024-04-16" },
  ];
  
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          padding: "20px",
          maxWidth: "500px",
        }}
        className="rounded-md bg-slate-900 text-cyan-50"
      >
        <h2 className="font-sans text-3xl">NexMeet</h2>
        <p className="pt-3 font-serif">
          Welcome to NexMeet, your all-in-one solution for immersive and
          seamless video conferencing. Built with cutting-edge NextJS
          technology, NexMeet redefines the virtual collaboration experience,
          making remote meetings as effective and engaging as in-person
          interactions
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "30%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <MeetingButton />
        {messages.map((message) => (
      <MessageList key={message.date} message={message.message} date={message.date} />
    ))}
      </div>
   
    </div>
  );
}
