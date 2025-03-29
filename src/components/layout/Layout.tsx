
import { ReactNode } from "react";
import Navbar from "./Navbar";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-2 flex justify-end">
        <LanguageSelector 
          currentLanguage={language} 
          onChange={setLanguage} 
        />
      </div>
      
      <ScrollArea className="flex-grow animate-fade-in">
        <main className="container mx-auto px-4 py-2 pb-20">
          {children}
        </main>
      </ScrollArea>
    </div>
  );
};

export default Layout;
