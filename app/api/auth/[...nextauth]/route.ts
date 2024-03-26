import NextAuth from"next-auth"
import { Next_Auth_Config } from "@/app/lib/auth"

const handler=NextAuth({...Next_Auth_Config})

export{handler as GET,handler as POST}