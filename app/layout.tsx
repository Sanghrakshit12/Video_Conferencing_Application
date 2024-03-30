import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/navbar";
import Provider from "./lib/provider";
import { getServerSession } from "next-auth";
import { Next_Auth_Config } from "./lib/auth";
import { Toaster } from "@/Components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <main className="flex h-screen flex-col items-center justify-center">
          <Provider session={session}>
            <Navbar />
            <div>{children}</div>
          </Provider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
