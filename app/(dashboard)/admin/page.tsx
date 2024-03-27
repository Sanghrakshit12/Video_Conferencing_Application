import { Next_Auth_Config } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(Next_Auth_Config);
  if (session?.user) {
    return (
      <div className="text-3xl">
        Application Logic
      </div>
    );
  } else {
    return (
      <div className="text-3xl">
        Sign in To Use the Application
      </div>
    );
  }
}
