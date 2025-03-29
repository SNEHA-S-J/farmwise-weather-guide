
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;
