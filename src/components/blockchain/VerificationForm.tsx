
import { useState } from "react";
import { Shield, Search, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { verifyBlockchainRecord } from "@/utils/blockchainUtils";
import { VerificationResult } from "@/types/blockchain";

export default function VerificationForm() {
  const [verifyTerm, setVerifyTerm] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!verifyTerm) {
      toast({
        title: "Error",
        description: "Please enter a record ID or blockchain hash",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyBlockchainRecord(verifyTerm) as VerificationResult;
      toast({
        title: result.isValid ? "Success" : "Verification Failed",
        description: result.message,
        variant: result.isValid ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during verification",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Enter record ID or blockchain hash..." 
              className="pl-10"
              value={verifyTerm}
              onChange={(e) => setVerifyTerm(e.target.value)}
            />
          </div>
          <Button 
            className="bg-medical-green hover:bg-green-700"
            onClick={handleVerify}
            disabled={isVerifying}
          >
            <Shield className="h-4 w-4 mr-1" />
            {isVerifying ? "Verifying..." : "Verify Authenticity"}
          </Button>
        </div>
        
        <div className="flex items-center mt-4 bg-blue-50 text-blue-800 p-3 rounded-md">
          <FileCheck className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm">
            Enter a record ID or blockchain hash to verify its authenticity and integrity on the blockchain.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
