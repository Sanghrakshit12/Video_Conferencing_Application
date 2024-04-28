"use client"

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  interface OptionProps {
    index: number;
    value: string;
  }

  function handleOptionChange({ index, value }: OptionProps) {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
          <div className="m-auto bg-white p-8">
            <div className="flex flex-col items-center">
              <p>Admin Prompt</p>
              <div className="w-full">
                <input
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Your Question"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                {question && <p>{question}</p>}
                <br />
                <p>Options:</p>
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange({ index, value: e.target.value })
                    }
                    placeholder={`Option ${index + 1}`}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                ))}
              </div>
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

export default Modal;
