"use client";
// import React from 'react';
// import { useSearchParams, usePathname } from 'next/navigation';
// import Link from 'next/link';

// function Modal() {
//   const searchParams = useSearchParams();
//   const modal = searchParams.get('modal');
//   const pathname = usePathname();

//   return (
//     <>
//       {modal && (
//         <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
//           <div className="bg-white rounded-lg p-8 shadow-lg">
//             <div className="flex flex-col items-center">
//               <p className="text-lg font-semibold mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum eligendi, voluptatibus quasi iusto perspiciatis vitae eos incidunt asperiores quae obcaecati.</p>
//               <Link href={pathname}>
//                 <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//                   Close Modal
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </dialog>
//       )}
//     </>
//   );
// }

// export default Modal;

//------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import { useSearchParams, usePathname } from "next/navigation";
// import Link from "next/link";

// function Modal() {
//   const searchParams = useSearchParams();
//   const modal = searchParams.get("modal");
//   const pathname = usePathname();

//   // State to manage the user's answer
//   const [answer, setAnswer] = useState("");

//   // Handler for updating the answer state
//   const handleAnswerChange = (event) => {
//     setAnswer(event.target.value);
//   };

//   // Handler for submitting the answer and closing the modal
//   const handleSubmit = () => {
//     // Handle the user's answer here
//     console.log("User answer:", answer);
//     // You can add further logic here, such as sending the answer to a server or processing it locally
//     // After handling the answer, close the modal
//     closeModal();
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     // Redirect to the same page without the modal query parameter
//     window.location.href = pathname;
//   };

//   return (
//     <>
//       {modal && (
//         <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
//           <div className="rounded-lg bg-white p-8 shadow-lg">
//             <div className="flex flex-col items-center">
//               <p className="mb-4 text-lg font-semibold">
//                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
//                 eligendi, voluptatibus quasi iusto perspiciatis vitae eos
//                 incidunt asperiores quae obcaecati.
//               </p>
//               {/* Text input field for user's answer */}
//               <input
//                 type="text"
//                 value={answer}
//                 onChange={handleAnswerChange}
//                 placeholder="Enter your answer..."
//                 className="mb-4 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
//               />
//               {/* Button to submit the answer and close the modal */}
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//               >
//                 Submit
//               </button>
//               {/* Button to close the modal without submitting the answer */}
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//               >
//                 Close Modal
//               </button>
//             </div>
//           </div>
//         </dialog>
//       )}
//     </>
//   );
// }

// export default Modal;

//------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get('modal');
  const pathname = usePathname();

  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage the user's answer
  const [answer, setAnswer] = useState('');

  // State to manage the remaining time
  const [remainingTime, setRemainingTime] = useState(0);

  // Function to update the remaining time
  const updateRemainingTime = () => {
    setRemainingTime((prevTime) => prevTime - 1000);
  };

  // Handler for updating the answer state
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  // Function to submit the answer and close the modal
  const handleSubmit = () => {
    // Handle the user's answer here
    console.log('User answer:', answer);
    // You can add further logic here, such as sending the answer to a server or processing it locally
    // After handling the answer, clear the answer and close the modal
    setAnswer('');
    setIsModalOpen(false);
    closeModal();
  };

  // Function to close the modal
  const closeModal = () => {
    // Redirect to the same page without the modal query parameter
    window.location.href = pathname;
  };

  // Timer duration in milliseconds (e.g., 5000 for 5 seconds)
  const timerDuration = 5000;

  useEffect(() => {
    // Set a timer to update the remaining time every second
    const timer = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Open the modal when the component mounts and the modal query parameter is present
    if (modal) {
      setIsModalOpen(true);
      setRemainingTime(timerDuration);
    }
  }, [modal]);

  useEffect(() => {
    // Close the modal when the remaining time reaches 0
    if (remainingTime <= 0 && isModalOpen) {
      handleSubmit();
    }
  }, [remainingTime]);

  // If the modal is not open, do not render anything
  if (!isModalOpen) {
    return null;
  }

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-lg relative">
        {/* Countdown timer */}
        <span className="absolute top-0 right-0 text-gray-700 px-2 py-1">{Math.max(0, Math.ceil(remainingTime / 1000))}s</span>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum eligendi, voluptatibus quasi iusto perspiciatis vitae eos incidunt asperiores quae obcaecati.</p>
          {/* Text input field for user's answer */}
          <input
            type="text"
            value={answer}
            onChange={handleAnswerChange}
            onKeyDown={(event) => {
                if(event.key === 'Enter'){
                    handleSubmit();
                }
            }}
            placeholder="Enter your answer..."
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
          />
          {/* Button to submit the answer and close the modal */}
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          {/* Button to close the modal without submitting the answer */}
          <button type="button" onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2">
            Close Modal
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
