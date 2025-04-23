
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Lock, LogIn, EyeOff, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type AuthMode = "login" | "register";

const Login = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-medical-light px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-medical-dark mb-2">
            {authMode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-neutral-500">
            {authMode === "login" 
              ? "Sign in to continue to MedCord" 
              : "Create your MedCord account"}
          </p>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-medical-dark mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className="bg-soft-gray border-neutral-200 focus:ring-medical-purple focus:border-medical-purple"
            />
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-medical-dark mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                className="bg-soft-gray border-neutral-200 focus:ring-medical-purple focus:border-medical-purple pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-medical-purple"
                disabled={submitting}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-medical-purple hover:bg-secondary-purple text-white transition-colors"
            disabled={submitting}
          >
            <LogIn className="mr-2" />
            {authMode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
        
        <div className="text-center">
          {authMode === "login" ? (
            <p className="text-sm text-neutral-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-medical-purple hover:underline font-medium"
                onClick={() => setAuthMode("register")}
                disabled={submitting}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-sm text-neutral-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-medical-purple hover:underline font-medium"
                onClick={() => setAuthMode("login")}
                disabled={submitting}
              >
                Sign in
              </button>
            </p>
          )}
        </div>
        
        <div className="text-center">
          <Link 
            to="/" 
            className="text-sm text-medical-blue hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 mt-4">
        © {new Date().getFullYear()} MedCord. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
