
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, UserPlus, Building2, Hospital, Stethoscope, MapPin, Phone, Mail, Clock, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

// Mock providers data
const providers = [
  {
    id: "prov1",
    name: "Dr. Sarah Johnson",
    specialty: "Primary Care Physician",
    organization: "City Health Clinic",
    address: "123 Medical Center Blvd, San Francisco, CA",
    phone: "(555) 123-4567",
    email: "sarah.johnson@cityhealth.org",
    lastVisit: "2023-11-15",
    accessLevel: "Full",
    status: "active"
  },
  {
    id: "prov2",
    name: "Dr. Michael Chang",
    specialty: "Cardiology",
    organization: "Heart Health Specialists",
    address: "456 Cardiac Way, San Francisco, CA",
    phone: "(555) 234-5678",
    email: "m.chang@hearthealth.org",
    lastVisit: "2023-10-10",
    accessLevel: "Limited",
    status: "active"
  },
  {
    id: "prov3",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    organization: "Skin Care Center",
    address: "789 Dermatology Dr, Oakland, CA",
    phone: "(555) 345-6789",
    email: "e.rodriguez@skincarecenter.com",
    lastVisit: "2023-09-22",
    accessLevel: "Limited",
    status: "active"
  },
  {
    id: "prov4",
    name: "Regional Medical Lab",
    specialty: "Laboratory Services",
    address: "321 Lab Road, San Francisco, CA",
    phone: "(555) 456-7890",
    email: "contact@regionallab.com",
    lastVisit: "2023-10-28",
    accessLevel: "Specific Records",
    status: "active"
  },
  {
    id: "prov5",
    name: "Dr. Mark Wilson",
    specialty: "Dental",
    organization: "City Dental Group",
    address: "567 Smile Lane, San Jose, CA",
    phone: "(555) 567-8901",
    email: "mark.wilson@citydental.com",
    lastVisit: "2023-07-14",
    accessLevel: "None",
    status: "inactive"
  },
  {
    id: "prov6",
    name: "Vision Care Center",
    specialty: "Ophthalmology",
    address: "890 Clear View St, San Francisco, CA",
    phone: "(555) 678-9012",
    email: "appointments@visioncare.com",
    lastVisit: "2023-06-30",
    accessLevel: "None",
    status: "inactive"
  }
];

const providerSchema = z.object({
  name: z.string().min(2, "Provider name is required"),
  specialty: z.string().min(2, "Specialty is required"),
  organization: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  accessLevel: z.enum(["Full", "Limited", "Specific Records", "None"]),
});

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addProviderOpen, setAddProviderOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: "",
      specialty: "",
      organization: "",
      address: "",
      phone: "",
      email: "",
      accessLevel: "Limited",
    },
  });
  
  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const activeProviders = filteredProviders.filter(p => p.status === "active");
  const inactiveProviders = filteredProviders.filter(p => p.status === "inactive");
  
  const getAccessLevelColor = (level: string) => {
    switch(level) {
      case "Full": return "bg-medical-green";
      case "Limited": return "bg-amber-500";
      case "Specific Records": return "bg-blue-500";
      default: return "bg-gray-400";
    }
  };
  
  const handleAddProvider = async (data: z.infer<typeof providerSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would save this to your database
      // For this example, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate adding to providers list with current date
      const newProvider = {
        id: `prov${providers.length + 1}`,
        name: data.name,
        specialty: data.specialty,
        organization: data.organization || undefined,
        address: data.address,
        phone: data.phone,
        email: data.email,
        lastVisit: new Date().toISOString().split('T')[0],
        accessLevel: data.accessLevel,
        status: "active"
      };
      
      // In a real implementation, you would add this to the database
      // providers.push(newProvider);
      
      toast.success("Provider added successfully!");
      form.reset();
      setAddProviderOpen(false);
    } catch (error) {
      console.error("Error adding provider:", error);
      toast.error("Failed to add provider. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderProviderCard = (provider: typeof providers[0]) => (
    <Card key={provider.id} className="mb-4">
      <CardContent className="p-0">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-medical-purple/10 flex items-center justify-center mr-3">
                  {provider.organization ? 
                    <Building2 className="h-5 w-5 text-medical-purple" /> : 
                    <Stethoscope className="h-5 w-5 text-medical-purple" />
                  }
                </div>
                <div>
                  <h3 className="text-lg font-medium">{provider.name}</h3>
                  <p className="text-gray-500">{provider.specialty}</p>
                  {provider.organization && (
                    <p className="text-sm text-gray-500 flex items-center">
                      <Hospital className="h-3.5 w-3.5 mr-1" />
                      {provider.organization}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end">
              <Badge className={getAccessLevelColor(provider.accessLevel)}>
                <Shield className="h-3 w-3 mr-1" />
                {provider.accessLevel} Access
              </Badge>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Last visit: {new Date(provider.lastVisit).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              {provider.address}
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              {provider.phone}
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              {provider.email}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <Button variant="outline" className="mr-2">
              View Records
            </Button>
            <Button variant="outline" className="mr-2">
              Manage Access
            </Button>
            <Button>
              Share Record
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="medical-container">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h1 className="page-title">Healthcare Providers</h1>
            <Button 
              className="bg-medical-purple hover:bg-purple-700"
              onClick={() => setAddProviderOpen(true)}
            >
              <UserPlus size={16} className="mr-1" /> Add Provider
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search providers..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">
                Active Providers ({activeProviders.length})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive ({inactiveProviders.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {activeProviders.length > 0 ? (
                activeProviders.map(renderProviderCard)
              ) : (
                <div className="text-center py-16">
                  <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No active providers found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your search</p>
                  <Button onClick={() => setAddProviderOpen(true)}>
                    <Plus size={16} className="mr-1" /> Add New Provider
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inactive">
              {inactiveProviders.length > 0 ? (
                inactiveProviders.map(renderProviderCard)
              ) : (
                <div className="text-center py-16">
                  <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No inactive providers</h3>
                  <p className="text-gray-400">All your providers are currently active</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Dialog open={addProviderOpen} onOpenChange={setAddProviderOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Healthcare Provider</DialogTitle>
            <DialogDescription>
              Enter the details of the healthcare provider you want to add to your network.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddProvider)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. John Smith or Hospital Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Cardiology, Primary Care" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Hospital or Practice Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="123 Medical Plaza, San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="provider@example.com" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="accessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Level</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="Full">Full Access</option>
                        <option value="Limited">Limited Access</option>
                        <option value="Specific Records">Specific Records Only</option>
                        <option value="None">No Access</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setAddProviderOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-medical-purple hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Provider"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Providers;
