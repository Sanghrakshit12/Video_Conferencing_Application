import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video Conferrencing App",
  description: "Welcome to NexMeet, your all-in-one solution for immersive and seamless video conferencing. Built with cutting-edge NexJS technology, NexMeet redefines the virtual collaboration experience, making remote meetings as effective and engaging as in-person interactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen flex flex-col justify-center items-center">
          <Navbar />
            {children}
        </main>
      
        </body>
    </html>
  );
}
