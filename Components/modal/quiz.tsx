"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Quiz from "./quiz";

export default function XXX() {
  const searchParams = useSearchParams();
  const quiz = searchParams.get("quiz");
  const pathname = usePathname();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  return (
    <>
      {quiz && (
        <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
          <div className="m-auto bg-white p-8">
            <div className="flex flex-col items-center">
              <p className="p-4">Admin Prompt</p>
              <div className="w-full">
                <input
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Your Question"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <br />
                <input
                  onChange={(e) => {
                    setOption1(e.target.value);
                  }}
                  type="text"
                  placeholder="Option 1"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <input
                  onChange={(e) => {
                    setOption2(e.target.value);
                  }}
                  type="text"
                  placeholder="Option 2"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <input
                  onChange={(e) => {
                    setOption3(e.target.value);
                  }}
                  type="text"
                  placeholder="Option 3"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <input
                  onChange={(e) => {
                    setOption4(e.target.value);
                  }}
                  type="text"
                  placeholder="Option 4"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <br />
              <Link href={"?quiz=true"}>
                <button type="button" className="bg-red-500 p-2 text-white">
                  Generate Quiz
                </button>
              </Link>
           
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
