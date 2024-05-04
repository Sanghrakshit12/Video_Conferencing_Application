import type { Metadata } from "next";
import "./globals.css";
import Provider from "./lib/provider";
import { getServerSession } from "next-auth";
import { Next_Auth_Config } from "./lib/auth";
import { Toaster } from "./Components/ui/toaster";

export const metadata: Metadata = {
  title: "NexMeet",
  description:
    "Welcome to NexMeet, your all-in-one solution for immersive and seamless video conferencing. Built with cutting-edge NexJS technology, NexMeet redefines the virtual collaboration experience, making remote meetings as effective and engaging as in-person interactions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(Next_Auth_Config);
  console.log(session);
  return (
    <html lang="en">
      <body className="bg-slate-200">
        <main className=" flex h-screen flex-col items-center justify-center ">
          <Provider session={session}>
            <div className="">{children}</div>
          </Provider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
