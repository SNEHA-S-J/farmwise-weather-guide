
import { Bell, Home, Calendar, BookOpen, MessageCircle, Menu, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userCrop");
    localStorage.removeItem("userRegion");
    setIsAuthenticated(false);
    // Refresh the page to update auth state everywhere
    window.location.href = "/";
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
          
          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Desktop menu */}
            <nav className="flex space-x-6 mr-4">
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
            
            {!isAuthenticated ? (
              <>
                <Link to="/signin">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <LogIn size={16} />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="flex items-center gap-1">
                    <UserPlus size={16} />
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Menu">
              <Menu size={24} />
            </Button>
          </div>
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
            
            {/* Auth buttons (mobile) */}
            <div className="border-t mt-2 pt-2">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/signin"
                    className="flex items-center space-x-2 py-3 px-2 text-gray-600 hover:text-farm-green hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 py-3 px-2 text-gray-600 hover:text-farm-green hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus size={20} />
                    <span>Sign Up</span>
                  </Link>
                </>
              ) : (
                <button
                  className="flex items-center space-x-2 py-3 px-2 w-full text-left text-gray-600 hover:text-farm-green hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogIn size={20} />
                  <span>Log Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
