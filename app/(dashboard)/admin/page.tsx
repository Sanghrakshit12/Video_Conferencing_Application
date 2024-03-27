import { Next_Auth_Config } from "@/app/lib/auth";
import Myloader from "@/app/loading";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session=await getServerSession(Next_Auth_Config)
  console.log(session)
    return (
      <div  className="text-3xl">
       Application Logic
      </div>
    );
  }
  