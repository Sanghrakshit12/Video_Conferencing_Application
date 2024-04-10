import useStreamCall from "@/app/hook/useStreamCall";
import {
  DeviceSettings,
  VideoPreview,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import PermissionPrompt from "./PermissionPrompt";
import { useEffect, useState } from "react";
import Button from "../Button";
import {AudioVolumeIndicator} from "./AudioVolumeIndicator";

interface SetupUiProps {
  onSetupComplete: () => void;
}

export default function SetupUi({ onSetupComplete }: SetupUiProps) {
  const call = useStreamCall();

  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const micState = useMicrophoneState();
  const camState = useCameraState();
  const [MicCamDisabled, setMicCamDiabled] = useState(false);
  useEffect(() => {
    if (MicCamDisabled) {
      call.camera.disable();
      call.camera.enable();
    } else {
      call.camera.enable();
      call.camera.enable();
    }
  }, [MicCamDisabled, call]);
  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return <PermissionPrompt />;
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-2xl font-bold ">Setup</h1>
      <VideoPreview />
      <div className="h-16 flex-1 items-center gap-3">
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={MicCamDisabled}
          onChange={(e) => setMicCamDiabled(e.target.checked)}
        />
        Join with Mic and Camera Off
        <Button onClick={onSetupComplete}>Join Meeting</Button>
      </label>
    </div>
  );
}
