"use client"

import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

export default function Access(){
    const router=useRouter()
    toast({
        title: "Oops! Something Went Wrong",
        description: "Please Sign In First",
      });
    console.log("sign in First")
  router.push('/')
    return null
}