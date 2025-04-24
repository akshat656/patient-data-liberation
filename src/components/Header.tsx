
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, Menu, Settings } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="medical-container py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-medical-blue to-medical-purple flex items-center justify-center mr-2">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-medical-dark">MedCord</span>
          </Link>
          
          <div className="hidden md:flex items-center">
            <div className="pr-6 border-r border-gray-200">
              <nav className="flex items-center space-x-6">
                <Link to="/dashboard" className="text-gray-600 hover:text-medical-purple">Dashboard</Link>
                <Link to="/records" className="text-gray-600 hover:text-medical-purple">Records</Link>
                <Link to="/providers" className="text-gray-600 hover:text-medical-purple">Providers</Link>
                <Link to="/blockchain" className="text-gray-600 hover:text-medical-purple">Blockchain</Link>
              </nav>
            </div>
            
            <div className="pl-6">
              {user ? (
                <div className="flex items-center">
                  <Button variant="ghost" className="text-gray-600 hover:text-medical-purple" asChild>
                    <Link to="/settings">Settings</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-gray-600 hover:text-medical-purple"
                    onClick={async () => {
                      await import("@/integrations/supabase/client").then(mod =>
                        mod.supabase.auth.signOut()
                      );
                      window.location.href = "/login";
                    }}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <Button className="bg-medical-blue hover:bg-blue-700" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 pt-4 border-t border-gray-100">
            <nav className="grid gap-2">
              <Link to="/dashboard" onClick={toggleMenu} className="px-4 py-2 hover:bg-gray-50 rounded-md">Dashboard</Link>
              <Link to="/records" onClick={toggleMenu} className="px-4 py-2 hover:bg-gray-50 rounded-md">Records</Link>
              <Link to="/providers" onClick={toggleMenu} className="px-4 py-2 hover:bg-gray-50 rounded-md">Providers</Link>
              <Link to="/blockchain" onClick={toggleMenu} className="px-4 py-2 hover:bg-gray-50 rounded-md">Blockchain</Link>
            </nav>
            
            {user ? (
              <div className="w-full flex flex-col gap-1 pt-2">
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = "/settings";
                  }}
                >
                  <Settings size={16} className="mr-2" />
                  Account Settings
                </Button>
                <Button
                  className="w-full text-red-500"
                  variant="ghost"
                  onClick={async () => {
                    await import("@/integrations/supabase/client").then(mod =>
                      mod.supabase.auth.signOut()
                    );
                    setIsMenuOpen(false);
                    window.location.href = "/login";
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  Log out
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={toggleMenu}>
                <Button className="w-full mt-2 bg-medical-blue hover:bg-blue-700">Login</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
