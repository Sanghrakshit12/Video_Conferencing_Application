import Access from "@/Components/access";
import ClientProvider from "../lib/ClientProvider";
import { Next_Auth_Config } from "../lib/auth";
import { getServerSession } from "next-auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(Next_Auth_Config);
  if (session?.user) {
    return (
      <div>
        <ClientProvider>
          <div>{children}</div>
        </ClientProvider>
      </div>
    );
  } else {
    return <Access />;
  }
}
