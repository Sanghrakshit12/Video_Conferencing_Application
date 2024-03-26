import Link from "next/link"
import {Video} from 'lucide-react'
import LogoutButton from "./forms/authbutton"
import AuthButtons from "./forms/authbutton"

export default function Navbar(){
    return <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
        <div className="container flex items-center justify-between">
            <Link href={"/"}><Video size={36} /></Link>
            <AuthButtons />
            
        </div>
    </div>
}