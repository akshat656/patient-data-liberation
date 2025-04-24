
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface AppointmentCardProps {
  provider: string;
  specialty: string;
  location: string;
  date: string;
}

export function AppointmentCard({ provider, specialty, location, date }: AppointmentCardProps) {
  // Format the date and time for better display
  const appointmentDate = new Date(date);
  const formattedDate = appointmentDate.toLocaleDateString();
  const formattedTime = appointmentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

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
          <p className="text-gray-500 text-sm">{formattedTime}</p>
          <Button variant="outline" size="sm" className="mt-2">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
