
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
