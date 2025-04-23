import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Lock, LogIn, EyeOff, Eye, UserPlus, User, HospitalIcon, mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

type AuthMode = "patient" | "provider";
type UserType = "patient" | "doctor" | "hospital" | "insurer";

const Login = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<UserType>("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSending, setForgotSending] = useState(false);

  useEffect(() => {
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

    if (authMode === "provider" && !name) {
      toast.error("Provider name is required.");
      setSubmitting(false);
      return;
    }
    
    if (authMode === "provider" && !agreeTerms) {
      toast.error("You must agree to the verification process.");
      setSubmitting(false);
      return;
    }

    try {
      let result;
      
      const metadata = {
        userType: authMode === "patient" ? "patient" : userType,
        name: name || undefined
      };
      
      if (email.includes("new")) {
        result = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: metadata
          }
        });
        
        if (!result.error) {
          toast.success(`${authMode === "patient" ? "Patient" : "Provider"} account registered! Please check your email to confirm.`);
          toast.info("A unique blockchain identity has been created for you.");
        }
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
        
        if (!result.error) {
          toast.success("Logged in successfully!");
          setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
        }
      }
      
      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSending(true);
    if (!forgotEmail) {
      toast.error("Please enter your email address.");
      setForgotSending(false);
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: window.location.origin + "/login"
      });
      if (error) {
        toast.error("Password reset failed: " + error.message);
      } else {
        toast.success("Password reset email sent! Check your inbox.");
        setForgotOpen(false);
      }
    } catch (err: any) {
      toast.error("Something went wrong: " + (err?.message || ""));
    }
    setForgotSending(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-medical-light px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-medical-dark mb-2">
            MedCord Secure Access
          </h2>
          <p className="text-neutral-500">
            Blockchain-powered medical records management
          </p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 pt-4">
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
                <div className="text-right mt-1">
                  <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-medical-blue hover:underline text-xs font-medium"
                        style={{
                          color: "#1EAEDB"
                        }}
                      >
                        Forgot password?
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset your password</DialogTitle>
                        <DialogDescription>
                          Enter your email and we&apos;ll send you a link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleForgotPassword} className="space-y-4 pt-2">
                        <div>
                          <label className="block text-sm font-medium text-medical-dark mb-2">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            required
                            disabled={forgotSending}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="w-full bg-medical-blue hover:bg-blue-700 text-white"
                            disabled={forgotSending}
                          >
                            <mail className="mr-2" size={16} />
                            Send reset link
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-medical-purple hover:bg-secondary-purple text-white transition-colors"
                disabled={submitting}
              >
                <LogIn className="mr-2" />
                Sign In to MedCord
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                Secure blockchain authentication with end-to-end encryption
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="pt-4">
            <div className="flex gap-4 mb-4">
              <Button
                type="button"
                variant={authMode === "patient" ? "default" : "outline"}
                className={authMode === "patient" ? "bg-medical-purple flex-1" : "flex-1"}
                onClick={() => setAuthMode("patient")}
              >
                <User className="mr-2 h-4 w-4" />
                Patient
              </Button>
              <Button
                type="button"
                variant={authMode === "provider" ? "default" : "outline"}
                className={authMode === "provider" ? "bg-medical-blue flex-1" : "flex-1"}
                onClick={() => setAuthMode("provider")}
              >
                <HospitalIcon className="mr-2 h-4 w-4" />
                Provider
              </Button>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === "provider" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-medical-dark mb-2">
                      Provider Name
                    </label>
                    <Input
                      placeholder="Hospital or Practice Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      className="bg-soft-gray border-neutral-200 focus:ring-medical-purple focus:border-medical-purple"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-medical-dark mb-2">
                      Provider Type
                    </label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value as UserType)}
                      disabled={submitting}
                      className="w-full p-2 bg-soft-gray border border-neutral-200 rounded-md focus:ring-medical-purple focus:border-medical-purple"
                    >
                      <option value="doctor">Doctor/Physician</option>
                      <option value="hospital">Hospital/Clinic</option>
                      <option value="insurer">Insurance Provider</option>
                    </select>
                  </div>
                </>
              )}
              
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
                  Create Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a secure password"
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
              
              {authMode === "provider" && (
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms} 
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)} 
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I understand my credentials will be verified through the Provider Verification process
                  </label>
                </div>
              )}
              
              <Button
                type="submit"
                className={`w-full ${
                  authMode === "patient" 
                    ? "bg-medical-purple hover:bg-secondary-purple" 
                    : "bg-medical-blue hover:bg-blue-700"
                } text-white transition-colors`}
                disabled={submitting || (authMode === "provider" && !agreeTerms)}
              >
                <UserPlus className="mr-2" />
                {authMode === "patient" 
                  ? "Register as Patient" 
                  : `Register as ${userType === "doctor" ? "Doctor" : userType === "hospital" ? "Hospital" : "Insurer"}`}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By registering, you'll receive a secure blockchain identity for managing your{" "}
                {authMode === "patient" ? "medical records" : "healthcare services"}
              </p>
            </form>
          </TabsContent>
        </Tabs>
        
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
