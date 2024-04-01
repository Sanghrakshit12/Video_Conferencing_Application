import Navbar from "@/Components/navbar";
import ClientProvider from "../lib/ClientProvider";
import { Next_Auth_Config } from "../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { toast } from "@/Components/ui/use-toast";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(Next_Auth_Config);
  if (session?.user) {
    return (
      <ClientProvider>
        <Navbar />
        <div>{children}</div>
      </ClientProvider>
    );
  } else {
    redirect("/")
  }
}
