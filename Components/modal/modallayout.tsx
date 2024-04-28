import Link from "next/link";
import Modal from "./modal";

export default function ModalLayout() {
  return (
    <>
      <Link href="?modal=true">
        <button type="button" className="bg-blue-500 p-2 text-white">
          Create Prompt
        </button>
      </Link>
      <Modal />
    </>
  );
}
