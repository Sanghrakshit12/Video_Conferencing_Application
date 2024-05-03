"use client";
import { useState } from "react";
import ModalLayout from "./lay";

export default function Trial() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          type="text"
          placeholder="Enter Your Question"
          className="mb-4 w-64 rounded-md border border-gray-300 px-3 py-2"
        />
        <input
          onChange={(e) => {
            setOption1(e.target.value);
          }}
          type="text"
          placeholder="Option 1"
          className="mb-4 w-64 rounded-md border border-gray-300 px-3 py-2"
        />
        <input
          onChange={(e) => {
            setOption2(e.target.value);
          }}
          type="text"
          placeholder="Option 2"
          className="mb-4 w-64 rounded-md border border-gray-300 px-3 py-2"
        />
        <input
          onChange={(e) => {
            setOption3(e.target.value);
          }}
          type="text"
          placeholder="Option 3"
          className="mb-4 w-64 rounded-md border border-gray-300 px-3 py-2"
        />
        <input
          onChange={(e) => {
            setOption4(e.target.value);
          }}
          type="text"
          placeholder="Option 4"
          className="mb-4 w-64 rounded-md border border-gray-300 px-3 py-2"
        />
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
          onClick={handleClick}
        >
          Generate Quiz
        </button>
        {showModal && (
          <ModalLayout
            question={question}
            option1={option1}
            option2={option2}
            option3={option3}
            option4={option4}
          />
        )}
      </div>
    </div>
  );
}
