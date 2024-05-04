import ClientProvider from "@/app/lib/ClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "../../globals.css";
import Access from "@/app/Components/access";
import { getServerSession } from "next-auth";
import { Next_Auth_Config } from "@/app/lib/auth";

export default async function MeetingsLayout({
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
