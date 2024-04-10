"use client";
import { useRouter } from "next/navigation";

export default function MeetingButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin");
  };

  return (
    <button
      className="gap-2 rounded-full bg-blue-600 px-3 py-2 font-semibold text-white transition-colors hover:bg-blue-500"
      onClick={handleClick}
    >
      Create Meeting
    </button>
  );
}
