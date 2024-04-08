import { ReactNode } from "react";
import { FC } from "react";

interface Auth_LayoutProps {
  children: ReactNode;
}

const Auth_Layout: FC<Auth_LayoutProps> = ({ children }) => {
  return <div className="rounded-md bg-blue-500 p-10">{children}</div>;
};

export default Auth_Layout;
