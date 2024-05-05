"use client";

import { SessionProvider } from "next-auth/react";

interface Authtypes {
  children: React.ReactNode;
  session: any;
}

export default function Provider({ children, session }: Authtypes) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
