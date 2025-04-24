import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Lock, LogIn, EyeOff, Eye, UserPlus, User, HospitalIcon, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type AuthMode = "patient" | "provider";
type UserType = "patient" | "doctor" | "hospital" | "insurer";
type GenderType = "male" | "female" | "other" | "";

const patientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other", ""]).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  medicalHistory: z.string().optional(),
  emergencyContact: z.string().optional(),
  agreeTerms: z.boolean().refine(value => value === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const providerSchema = z.object({
  name: z.string().min(2, "Provider name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(["doctor", "hospital", "insurer"]),
  phone: z.string().optional(),
  address: z.string().optional(),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  agreeTerms: z.boolean().refine(value => value === true, {
    message: "You must agree to the verification process",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSending, setForgotSending] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const patientForm = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      address: "",
      medicalHistory: "",
      emergencyContact: "",
      agreeTerms: false,
    },
  });

  const providerForm = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      userType: "doctor",
      phone: "",
      address: "",
      specialization: "",
      licenseNumber: "",
      agreeTerms: false,
    },
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard", { replace: true });
    });

    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    const type = url.searchParams.get("type");
    
    if (token && type === "recovery") {
      setIsResetMode(true);
      toast.info("Please enter your new password below");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!email || !password) {
      toast.error("Email and password are required.");
      setSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!newPassword) {
      toast.error("Please enter a new password");
      setSubmitting(false);
      return;
    }

    try {
      const url = new URL(window.location.href);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        toast.error("Password reset failed: " + error.message);
      } else {
        toast.success("Password has been reset successfully!");
        window.history.replaceState({}, document.title, window.location.pathname);
        setIsResetMode(false);
        setTimeout(() => navigate("/login", { replace: true }), 1000);
      }
    } catch (error: any) {
      toast.error("Password reset failed: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const onPatientSubmit = async (data: z.infer<typeof patientSchema>) => {
    setSubmitting(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            userType: "patient",
            name: data.name,
            dateOfBirth: data.dateOfBirth || null,
            gender: data.gender || null,
            phone: data.phone || null,
            address: data.address || null,
            medicalHistory: data.medicalHistory || null,
            emergencyContact: data.emergencyContact || null
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Patient account registered! Please check your email to confirm.");
        toast.info("A unique blockchain identity has been created for you.");
        patientForm.reset();
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const onProviderSubmit = async (data: z.infer<typeof providerSchema>) => {
    setSubmitting(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            userType: data.userType,
            name: data.name,
            phone: data.phone || null,
            address: data.address || null,
            specialization: data.specialization || null,
            licenseNumber: data.licenseNumber || null
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(`${data.userType.charAt(0).toUpperCase() + data.userType.slice(1)} account registered! Please check your email to confirm.`);
        toast.info("A unique blockchain identity has been created for your provider account.");
        providerForm.reset();
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
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
        redirectTo: `${window.location.origin}/login`
      });
      
      if (error) {
        toast.error("Password reset failed: " + error.message);
      } else {
        toast.success("Password reset email sent! Check your inbox.");
        setResetSent(true);
      }
    } catch (err: any) {
      toast.error("Something went wrong: " + (err?.message || ""));
    }
    setForgotSending(false);
  };

  if (isResetMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-medical-light px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-medical-dark mb-2">
              Reset Password
            </h2>
            <p className="text-neutral-500">
              Please enter your new password
            </p>
          </div>
          
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-medical-dark mb-2">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
              <Lock className="mr-2" />
              Reset Password
            </Button>
          </form>
          
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm text-medical-blue hover:underline"
              onClick={() => {
                window.history.replaceState({}, document.title, window.location.pathname);
                setIsResetMode(false);
              }}
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <form onSubmit={handleLogin} className="space-y-4">
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
                            <Mail className="mr-2" size={16} />
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
            
            {authMode === "patient" ? (
              <Form {...patientForm}>
                <form onSubmit={patientForm.handleSubmit(onPatientSubmit)} className="space-y-4">
                  <FormField
                    control={patientForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={patientForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={patientForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Create a secure password" 
                              {...field} 
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-medical-purple"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={patientForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={patientForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="male" id="male" />
                                  <label htmlFor="male">Male</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id="female" />
                                  <label htmlFor="female">Female</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="other" id="other" />
                                  <label htmlFor="other">Other</label>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={patientForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={patientForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your home address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={patientForm.control}
                    name="medicalHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical History (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any relevant medical history or conditions" {...field} />
                        </FormControl>
                        <FormDescription>
                          This helps provide better medical care
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={patientForm.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Name and contact information" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={patientForm.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the Terms of Service and Privacy Policy
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-medical-purple hover:bg-secondary-purple text-white transition-colors"
                    disabled={submitting}
                  >
                    <UserPlus className="mr-2" />
                    Register as Patient
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By registering, you'll receive a secure blockchain identity for managing your medical records
                  </p>
                </form>
              </Form>
            ) : (
              <Form {...providerForm}>
                <form onSubmit={providerForm.handleSubmit(onProviderSubmit)} className="space-y-4">
                  <FormField
                    control={providerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Hospital or Practice Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={providerForm.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider Type</FormLabel>
                        <select
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full p-2 bg-soft-gray border border-neutral-200 rounded-md focus:ring-medical-purple focus:border-medical-purple"
                        >
                          <option value="doctor">Doctor/Physician</option>
                          <option value="hospital">Hospital/Clinic</option>
                          <option value="insurer">Insurance Provider</option>
                        </select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={providerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={providerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Create a secure password" 
                              {...field} 
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-medical-purple"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={providerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={providerForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your business address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={providerForm.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization/Services</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Medical specialty or services provided" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={providerForm.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License/Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your professional license number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={providerForm.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I understand my credentials will be verified through the Provider Verification process
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-medical-blue hover:bg-blue-700 text-white transition-colors"
                    disabled={submitting}
                  >
                    <UserPlus className="mr-2" />
                    Register as Provider
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By registering, you'll receive a secure blockchain identity for managing your healthcare services
                  </p>
                </form>
              </Form>
            )}
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
