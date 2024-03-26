"use client"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { buttonVariants } from '../ui/button'
import { Button } from '../ui/button'


const AuthButtons = () => {
    const { data: session } = useSession()

    const handleLogout = async () => {
        await signOut({ redirect: false, callbackUrl: '/' })

        window.location.replace('/')
    }


    if (session) {
        return <Button onClick={handleLogout} variant="destructive">Logout</Button>
    } else {
        return <div>
            <Link href={"/signin"} className={buttonVariants({ variant: "outline" })}>Register</Link>
        </div>
    }
}

export default AuthButtons
