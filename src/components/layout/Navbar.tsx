
import { Bell, Home, Calendar, BookOpen, MessageCircle, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Forecast", path: "/forecast" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
    { icon: BookOpen, label: "Tips", path: "/tips" },
    { icon: MessageCircle, label: "Community", path: "/community" },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-farm-green">FarmWise</h1>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Menu">
              <Menu size={24} />
            </Button>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center text-gray-600 hover:text-farm-green transition-colors"
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 py-3 px-2 text-gray-600 hover:text-farm-green hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
