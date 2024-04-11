import useStreamCall from "@/app/hook/useStreamCall";
import {
  CallControls,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGridIcon,
} from "lucide-react";
import { useState } from "react";
import EndCallButton from "./EndCallButton";
import { useRouter } from "next/navigation";

type CallLayout = "speaker-vert" | "speaker-horiz" | "grid";

export default function FlexibleCallLAyout() {
  const [layout, setLayout] = useState<CallLayout>("speaker-vert");
  const call = useStreamCall();
  const router = useRouter();
  return (
    <div className="space-y-3">
      <CallLayoutButtons Layout={layout} setLayout={setLayout} />
      <CallLayoutView Layout={layout} />
      <CallControls
        onLeave={() => {
          router.push(`/meeting/${call.id}/left`);
        }}
      />
      <EndCallButton />
    </div>
  );
}

interface CallLayoutViewProps {
  Layout: CallLayout;
}

function CallLayoutView({ Layout }: CallLayoutViewProps) {
  if (Layout == "speaker-vert") {
    return <SpeakerLayout />;
  }
  if (Layout == "speaker-horiz") {
    return <SpeakerLayout participantsBarPosition="right" />;
  }
  if (Layout == "grid") {
    return <PaginatedGridLayout />;
  }
  return null;
}

interface CallLayoutButtonsProps {
  Layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
}

function CallLayoutButtons({ Layout, setLayout }: CallLayoutButtonsProps) {
  return (
    <div className="mx-auto w-fit space-x-6">
      <button
        onClick={() => {
          setLayout("speaker-vert");
        }}
      >
        <BetweenVerticalEnd
          className={Layout !== "speaker-vert" ? "text-gray-400" : ""}
        />
      </button>
      <button
        onClick={() => {
          setLayout("speaker-horiz");
        }}
      >
        <BetweenHorizonalEnd
          className={Layout !== "speaker-horiz" ? "text-gray-400" : ""}
        />
      </button>
      <button
        onClick={() => {
          setLayout("grid");
        }}
      >
        <LayoutGridIcon className={Layout !== "grid" ? "text-gray-400" : ""} />
      </button>
    </div>
  );
}
