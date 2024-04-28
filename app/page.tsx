import MeetingButton from "@/Components/meetings/meetingbutton";
import Navbar from "@/Components/navbar";

export default function Home() {
  return (
    <div >
      <Navbar />
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
      </div>
    </div>
  );
}
