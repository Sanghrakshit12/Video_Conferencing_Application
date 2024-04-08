import Image from "next/image";
import bg from "../public/bg.webp";

export default function BgImage() {
  return <Image alt="Image" src={bg} />;
}
