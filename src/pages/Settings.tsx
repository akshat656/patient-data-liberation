
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { Shield, Lock, Users, HospitalIcon, FileCheck, Key } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    allowHospitals: true,
    allowDoctors: true,
    allowInsurance: false,
    automaticVerification: true,
    emergencyAccess: false,
  });
  const [saving, setSaving] = useState(false);

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  const handlePermissionChange = (key: string, value: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // Here we would update the blockchain with the new permission settings
      // using smart contracts as described in the flowchart
      
      // Simulating blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Your privacy settings have been updated");
    } catch (error) {
      toast.error("Failed to update settings");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="medical-container">
          <h1 className="page-title mb-8">Patient Privacy & Settings</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-medical-dark">
                    <Users className="mr-2 h-5 w-5 text-medical-purple" />
                    Healthcare Provider Access
                  </CardTitle>
                  <CardDescription>
                    Control which healthcare providers can access your medical records
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HospitalIcon className="text-medical-blue h-5 w-5" />
                      <div>
                        <p className="font-medium">Hospitals</p>
                        <p className="text-sm text-gray-500">Allow hospitals to access your records</p>
                      </div>
                    </div>
                    <Switch 
                      checked={permissions.allowHospitals}
                      onCheckedChange={(checked) => handlePermissionChange("allowHospitals", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HospitalIcon className="text-medical-green h-5 w-5" />
                      <div>
                        <p className="font-medium">Primary Care Doctors</p>
                        <p className="text-sm text-gray-500">Allow your assigned doctors to access your records</p>
                      </div>
                    </div>
                    <Switch 
                      checked={permissions.allowDoctors}
                      onCheckedChange={(checked) => handlePermissionChange("allowDoctors", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="text-amber-500 h-5 w-5" />
                      <div>
                        <p className="font-medium">Insurance Providers</p>
                        <p className="text-sm text-gray-500">Allow insurance companies to verify claims</p>
                      </div>
                    </div>
                    <Switch 
                      checked={permissions.allowInsurance}
                      onCheckedChange={(checked) => handlePermissionChange("allowInsurance", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-medical-dark">
                    <Lock className="mr-2 h-5 w-5 text-medical-purple" />
                    Smart Contract Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how your data is accessed through blockchain smart contracts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="text-medical-blue h-5 w-5" />
                      <div>
                        <p className="font-medium">Automatic Verification</p>
                        <p className="text-sm text-gray-500">Allow smart contracts to automatically verify legitimate requests</p>
                      </div>
                    </div>
                    <Switch 
                      checked={permissions.automaticVerification}
                      onCheckedChange={(checked) => handlePermissionChange("automaticVerification", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Key className="text-red-500 h-5 w-5" />
                      <div>
                        <p className="font-medium">Emergency Access</p>
                        <p className="text-sm text-gray-500">Allow emergency access to critical health information</p>
                      </div>
                    </div>
                    <Switch 
                      checked={permissions.emergencyAccess}
                      onCheckedChange={(checked) => handlePermissionChange("emergencyAccess", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-medical-purple hover:bg-secondary-purple" 
                    onClick={saveSettings}
                    disabled={saving}
                  >
                    {saving ? "Updating Blockchain..." : "Save Privacy Settings"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="bg-gradient-to-br from-medical-blue/10 to-medical-purple/10">
                <CardHeader>
                  <CardTitle className="text-medical-dark">Your Blockchain Identity</CardTitle>
                  <CardDescription>Decentralized & Secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Patient ID</p>
                    <p className="bg-white/60 p-2 rounded font-mono text-xs border border-gray-200 mt-1 break-all">
                      {user?.id || "0x7e4d86b59b1b0375fc97c3f8c49a2d7c4851df63b8"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Records Stored</p>
                    <p className="text-xl font-bold text-medical-dark">24</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Blockchain Update</p>
                    <p className="text-medical-dark">Today, 2:35 PM</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full border-medical-blue text-medical-blue">
                      View Blockchain Ledger
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 flex items-center">
                  <Shield className="h-5 w-5 mr-2" /> Privacy Information
                </h3>
                <p className="mt-2 text-sm text-amber-700">
                  Your medical data is encrypted and stored on a decentralized file system (IPFS). 
                  Only you can grant or revoke access via blockchain smart contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
