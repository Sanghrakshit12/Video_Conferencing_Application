import { getServerSession } from "next-auth";
import { Next_Auth_Config } from "@/app/lib/auth";

export default async function admin() {
    const session = getServerSession(Next_Auth_Config);
    console.log(session)
    return <div>
        <h1 className="text-4xl h-screen flex flex-col justify-center items-center">Welcome </h1>
    </div>

}

