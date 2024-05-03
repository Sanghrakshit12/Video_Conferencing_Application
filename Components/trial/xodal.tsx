"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export default function Modal({
  question,
  option1,
  option2,
  option3,
  option4,
}: Props) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
          <div className="m-auto bg-white p-8">
            <div className="flex flex-col items-center">
              <p className="p-4">Quiz Prompt</p>
              <div className="w-full">{question}</div>
              <div className="w-full">{option1}</div>
              <div className="w-full">{option2}</div>
              <div className="w-full">{option3}</div>
              <div className="w-full">{option4}</div>
              <br />

              <Link href={pathname}>
                <button type="button" className="bg-red-500 p-2 text-white">
                  Close Modal
                </button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
