
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

/**
 * Component that wraps protected routes.
 * Redirects unauthenticated users to /login.
 */
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-medical-light">
        <span className="text-lg text-medical-dark">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;

