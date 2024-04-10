import Link from "next/link";
import Image from "next/image";
import { Video } from "lucide-react";
import AuthButtons from "./forms/authbutton";
import { Next_Auth_Config } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import bg from "../public/nav-icon.png";

export default async function Navbar() {
  const session = await getServerSession(Next_Auth_Config);

  return (
    <div className="fixed top-0 z-10 w-full border-b  bg-blue-600 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image src={bg} alt="Icon" width={45} height={3} />
          </Link>
        </div>
        <div className="flex items-end">
          {session && (
            <h1 className="text-m mr-4 pr-5 font-serif font-bold">
              Hello {session?.user?.name} !😊
            </h1>
          )}
          <AuthButtons />
        </div>
      </div>
    </div>
  );
}
