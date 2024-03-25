import { ReactNode } from "react"
import { FC } from "react"

interface Auth_LayoutProps{
    children :ReactNode
}

const Auth_Layout:FC<Auth_LayoutProps>=({children})=>{
return <div className="bg-slate-300 p-10 rounded-md">
    {children}
</div>
}

export default Auth_Layout;