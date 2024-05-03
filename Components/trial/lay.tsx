import Link from "next/link";
import Modal from "./xodal";

interface Props {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export default function ModalLayout({
  question,
  option1,
  option2,
  option3,
  option4,
}: Props) {
  return (
    <>
      <Link href="?modal=true">
        <button type="button" className="bg-blue-500 p-2 text-white">
          Create Prompt
        </button>
      </Link>
      <Modal question={question}
        option1={option1}
        option2={option2}
        option3={option3}
        option4={option4}/>
    </>
  );
}
