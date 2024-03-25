import Link from "next/link"
import { buttonVariants } from "./ui/button"
import {Video} from 'lucide-react'

export default function Navbar(){
    return <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
        <div className="container flex items-center justify-between">
            <Link href={"/"}><Video size={36} /></Link>
            <Link href={"/signin"}className={buttonVariants({ variant: "outline" })}>Register</Link>
        </div>
    </div>
}