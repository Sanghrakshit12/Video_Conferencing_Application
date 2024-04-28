import MeetingButton from "@/Components/meetings/meetingbutton";
import Navbar from "@/Components/navbar";
import onlineMeeting from "../public/online-meeting.png";
import Image from "next/image";
export default function Home() {
  return (
    <div >
      <Navbar />
      <div className="flex sm:flex-row flex-col">
        <div className=" w-4/5 sm:w-1/3 m-2  sm:mx-24" >
          <div
            // style={{position: "absolute",top: "25%",left: "25%",transform: "translate(-50%, -50%)",zIndex: 1,padding: "20px",maxWidth: "500px",}}
            className="rounded-md  text-black w-full  sm:p-8 p-4"
          >
            <h2 className="font-sans text-4xl sm:text-6xl mb-8 font-bold m-3 hover:scale-105 transition-all ">NexMeet</h2>
            <p className="pt-3 font-serif text-md sm:text-xl text-slate-500 m-3">
              Welcome to NexMeet, your all-in-one solution for immersive and
              seamless video conferencing. Built with cutting-edge NextJS
              technology, NexMeet redefines the virtual collaboration experience,
              making remote meetings as effective and engaging as in-person
              interactions
            </p>
          </div>
          <div className="flex justify-end py-3"
          // style={{
          //   // position: "absolute",
          //   // top: "45%",
          //   // left: "30%",
          //   // transform: "translate(-50%, -50%)",
          //   // zIndex: 1,
          // }}
          >
            <MeetingButton classes={'text-xl px-8 py-4 hover:scale-105 transition-all'} />
          </div>
        </div>
        <div className="flex items-center justify-center  w-1/2 mx-auto mt-12 ">
          <Image src={onlineMeeting} alt="Icon" width={300} height={300}  className="" />
        </div>
      </div>
    </div>
  );
}
