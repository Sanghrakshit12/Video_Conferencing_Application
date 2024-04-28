import { buttonVariants } from "@/Components/ui/button";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default function Page({ params: { id } }: PageProps) {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="max-w-lg rounded-lg bg-white p-8 shadow-md">
          <p className="text-center">
            You Left the Meeting
            <span className="font-bold text-red-600"> - NexMeet</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 pt-5">
        <Link href={"/"} passHref>
          <button className={buttonVariants({ variant: "destructive" })}>
            Home
          </button>
        </Link>
        <Link href={`/meeting/${id}`} passHref>
          <button className={buttonVariants({ variant: "destructive" })}>
            Rejoin Meeting
          </button>
        </Link>
      </div>
    </>
  );
}
