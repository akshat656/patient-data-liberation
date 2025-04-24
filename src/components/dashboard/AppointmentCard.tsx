
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

interface AppointmentCardProps {
  provider: string;
  specialty: string;
  location: string;
  date: string;
}

export function AppointmentCard({ provider, specialty, location, date }: AppointmentCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center mr-4">
            <Stethoscope className="h-6 w-6 text-medical-blue" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{provider}</h3>
            <p className="text-gray-500">{specialty} • {location}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">
            {new Date(date).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            {new Date(date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
