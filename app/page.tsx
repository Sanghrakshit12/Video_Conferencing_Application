import MeetingButton from "./Components/meetings/meetingbutton";
import Navbar from "./Components/navbar";
import onlineMeeting from "../public/online-meeting.png";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col sm:flex-row">
        <div className=" m-2 w-4/5 sm:mx-24  sm:w-1/3">
          <div className="w-full  rounded-md p-4  text-black sm:p-8">
            <h2 className="m-3 mb-8 font-sans text-4xl font-bold transition-all hover:scale-105 sm:text-6xl ">
              NexMeet
            </h2>
            <p className="text-md m-3 pt-3 font-serif text-slate-500 sm:text-xl">
              Welcome to NexMeet, your all-in-one solution for immersive and
              seamless video conferencing. Built with cutting-edge NextJS
              technology, NexMeet redefines the virtual collaboration
              experience, making remote meetings as effective and engaging as
              in-person interactions
            </p>
          </div>
          <div className="flex justify-end py-3">
            <MeetingButton
              classes={"text-xl px-8 py-4 hover:scale-105 transition-all"}
            />
          </div>
        </div>
        <div className="mx-auto mt-12 flex  w-1/2 items-center justify-center ">
          <Image
            src={onlineMeeting}
            alt="Icon"
            width={300}
            height={300}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
