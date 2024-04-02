import ClientProvider from "@/app/lib/ClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css"

export default async function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <div>{children}</div>
    </ClientProvider>
  );
}
