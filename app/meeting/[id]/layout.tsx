import ClientProvider from "@/app/lib/ClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "../../globals.css";
import ModalLayout from "@/Components/modal/modallayout";
import Trial from "@/Components/trial/inputs";

export default async function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <div>
      <Trial />
        {children}</div>
    </ClientProvider>
  );
}
