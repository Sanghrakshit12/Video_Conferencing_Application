import ClientProvider from "@/app/lib/ClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "../../globals.css";
import ModalLayout from "@/Components/modal/modallayout";

export default async function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <div>
      <ModalLayout />
        {children}</div>
    </ClientProvider>
  );
}
