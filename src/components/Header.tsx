
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Activity, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Medical Records", icon: FileText, path: "/records" },
    { name: "Healthcare Providers", icon: Users, path: "/providers" },
    { name: "Blockchain Status", icon: Activity, path: "/blockchain" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="medical-container">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-medical-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold">PL</span>
            </div>
            <span className="font-bold text-xl text-medical-dark">MedChain</span>
          </Link>

          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          ) : (
            <nav className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <Button variant="ghost" className="flex items-center space-x-1 text-gray-600 hover:text-medical-purple">
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              ))}
              <Link to="/login">
                <Button className="ml-4 bg-medical-blue hover:bg-blue-700">Login</Button>
              </Link>
            </nav>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Link key={item.name} to={item.path} onClick={toggleMenu}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-600 hover:text-medical-purple hover:bg-gray-50"
                  >
                    <item.icon size={16} className="mr-2" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              ))}
              <Link to="/login" onClick={toggleMenu}>
                <Button className="w-full mt-2 bg-medical-blue hover:bg-blue-700">Login</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
