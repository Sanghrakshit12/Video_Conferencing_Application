"use client";

import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useEffect } from "react";

export default function Access() {
  const router = useRouter();

  toast({
    title: "Oops! Something Went Wrong",
    description: "Please Sign In First",
  });

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return null;
}
