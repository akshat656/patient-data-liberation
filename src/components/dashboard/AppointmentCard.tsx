
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Calendar, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentCardProps {
  id: string;
  provider: string;
  specialty: string;
  location: string;
  date: string;
  verified?: boolean;
  onVerify?: (id: string) => void;
}

export function AppointmentCard({ 
  id, 
  provider, 
  specialty, 
  location, 
  date, 
  verified = false,
  onVerify 
}: AppointmentCardProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(verified);
  const { toast } = useToast();

  // Format the date and time for better display
  const appointmentDate = new Date(date);
  const formattedDate = appointmentDate.toLocaleDateString();
  const formattedTime = appointmentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const handleVerify = async () => {
    setIsVerifying(true);
    
    // Simulate verification process with a short delay
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
      
      // Call the onVerify callback if provided
      if (onVerify) {
        onVerify(id);
      }
      
      toast({
        title: "Appointment Verified",
        description: `Your appointment with ${provider} has been confirmed.`,
      });
    }, 1000);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center mr-4">
            <Stethoscope className="h-6 w-6 text-medical-blue" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{provider}</h3>
            <p className="text-gray-500">{specialty}</p>
            <p className="text-gray-500 flex items-center text-sm">
              <span className="inline-block mr-2">{location}</span>
            </p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="flex items-center text-medical-green mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            <p className="font-medium">{formattedDate}</p>
          </div>
          <p className="text-gray-500 text-sm mb-2">{formattedTime}</p>
          
          <div className="flex items-center gap-2">
            {isVerified ? (
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Verified</span>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                onClick={handleVerify}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Clock className="h-3 w-3 mr-1 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            )}
            <Button variant="outline" size="sm">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
