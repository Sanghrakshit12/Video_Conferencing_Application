import useStreamCall from "@/app/hook/useStreamCall";
import { DeviceSettings, VideoPreview, useCallStateHooks } from "@stream-io/video-react-sdk";
import PermissionPrompt from "./PermissionPrompt";
import { useEffect, useState } from "react";

interface SetupUiProps {
  onSetupComplete: () => void;
}

export default function SetupUi({ onSetupComplete }: SetupUiProps) {
  const call = useStreamCall();

  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const micState = useMicrophoneState();
  const camState = useCameraState();
const [MicCamDisabled,seMicCamDiabled]=useState(false)
useEffect(()=>{
if(MicCamDisabled){
    call.camera.disable()
    call.camera.enable()
}
else{
    call.camera.enable()
    call.camera.enable()
}
},[MicCamDisabled,call])
  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
   return <PermissionPrompt />;
  }
  return <div className="flex flex-col items-center gap-3">
    <h1 className="font-bold text-center text-2xl ">Setup</h1>
    <VideoPreview/>
    <div className="flex-1 h-16 items-center gap-3">
        <DeviceSettings/>
    </div>
  </div>
}
