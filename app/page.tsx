import MeetingButton from "@/Components/meetings/meetingbutton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl">Welcome To NexMeeT</h1>
      <div className="mt-4">
        <MeetingButton />
      </div>
    </div>
  );
}
