
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Lock, Mail, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type AuthMode = "login" | "register";

const Login = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard", { replace: true });
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!email || !password) {
      toast.error("Email and password are required.");
      setSubmitting(false);
      return;
    }

    let result;
    if (authMode === "login") {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    const { error } = result;
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        authMode === "login"
          ? "Logged in successfully!"
          : "Registered! Please check your email to confirm your account."
      );
      if (authMode === "login") {
        setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-medical-light px-4 py-8">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-medical-dark mb-4 text-center">
          {authMode === "login" ? "Login to MedCord" : "Register for MedCord"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 flex items-center">
              <Mail className="h-4 w-4 mr-2" /> Email
            </label>
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 flex items-center">
              <Lock className="h-4 w-4 mr-2" /> Password
            </label>
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={submitting}
            />
          </div>
          <Button
            className="w-full bg-medical-purple hover:bg-medical-blue transition-colors text-lg"
            type="submit"
            disabled={submitting}
          >
            <LogIn className="mr-2" />
            {authMode === "login" ? "Login" : "Register"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          {authMode === "login" ? (
            <span>
              New to MedCord?{" "}
              <button
                className="text-medical-purple hover:underline font-medium"
                onClick={() => setAuthMode("register")}
                disabled={submitting}
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                className="text-medical-purple hover:underline font-medium"
                onClick={() => setAuthMode("login")}
                disabled={submitting}
              >
                Login
              </button>
            </span>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="text-medical-blue hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-3 text-center">
        © {new Date().getFullYear()} MedCord
      </div>
    </div>
  );
};

export default Login;

