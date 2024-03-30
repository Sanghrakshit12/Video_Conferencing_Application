import Navbar from "@/Components/navbar";
import ClientProvider from "../lib/ClientProvider";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <Navbar />
      <div>{children}</div>
    </ClientProvider>
  );
}
