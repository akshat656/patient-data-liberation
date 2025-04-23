
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { useState } from "react";
import { LogOut, Settings, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const AccountMenu = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    const { error } = await import("@/integrations/supabase/client").then(mod =>
      mod.supabase.auth.signOut()
    );
    if (error) {
      toast.error("Logout failed");
    } else {
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <UserRound size={18} className="text-gray-600" />
        <span>Account</span>
      </Button>
      {open && (
        <div className="absolute right-0 top-10 z-50 bg-white shadow-lg border rounded-md w-48 py-2 animate-in fade-in">
          <button
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
            className="w-full px-4 py-2 flex items-center text-gray-700 hover:bg-medical-blue/10 space-x-2"
          >
            <Settings size={16} />
            <span>Account Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 flex items-center text-gray-700 hover:bg-red-50 space-x-2"
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;

