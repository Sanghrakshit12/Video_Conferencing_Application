"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { buttonVariants } from "../ui/button";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const AuthButtons = () => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    toast({
      title: "Logged Out Successfully",
      description: "See you Soon",
    });

    window.location.replace("/");
  };

  if (session) {
    return (
      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    );
  } else {
    return (
      <>
        <div className="px-2">
          <Link
            href={"/signin"}
            className={buttonVariants({ variant: "outline" })}
          >
            Sign In
          </Link>
        </div>
        <div className="px-2">
          <Link
            href={"/signup"}
            className={buttonVariants({ variant: "outline" })}
          >
            Register
          </Link>
        </div>
      </>
    );
  }
};

export default AuthButtons;
