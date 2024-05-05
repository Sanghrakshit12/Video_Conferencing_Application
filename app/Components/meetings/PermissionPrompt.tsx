import { Mic, Webcam } from "lucide-react";

export default function PermissionPrompt() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <Webcam />
        <Mic />
      </div>
      <p className="text-center text-black">
        Please Allow Access to your Microphone and Camera to Join The Call
      </p>
    </div>
  );
}
