import ClientProvider from "../lib/ClientProvider";
import { Next_Auth_Config } from "../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "../globals.css";


export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(Next_Auth_Config);
  if (session?.user) {
    return (
      <ClientProvider>
        <div>{children}</div>
      </ClientProvider>
    );
  } else {
    redirect("/")
  }
}
