import Link from "next/link";
import { Video } from "lucide-react";
import AuthButtons from "./forms/authbutton";
import { Next_Auth_Config } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export default async function Navbar() {
  const session = await getServerSession(Next_Auth_Config);

  return (
    <div className="fixed top-0 z-10 w-full border-b border-s-zinc-200 bg-zinc-100 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link href={"/"}>
            <Video size={36} />
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
