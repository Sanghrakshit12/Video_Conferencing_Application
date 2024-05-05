"use client";

import { useRouter } from "next/navigation";
import { HTMLProps } from "react";

interface TextProps {
  classes: HTMLProps<HTMLElement>["className"];
}

export default function MeetingButton({ classes }: TextProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin");
  };

  return (
    <button
      className={`gap-2 rounded-full bg-blue-600 px-3 py-2 font-semibold text-white transition-colors hover:bg-blue-500 ${classes}`}
      onClick={handleClick}
    >
      Create Meeting
    </button>
  );
}
