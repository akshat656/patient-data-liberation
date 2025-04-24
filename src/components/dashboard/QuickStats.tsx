
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Stethoscope, Users, Clock } from "lucide-react";

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
            <FileText className="h-4 w-4 mr-1 text-medical-purple" />
            Total Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">24</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
            <Stethoscope className="h-4 w-4 mr-1 text-medical-blue" />
            Healthcare Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">6</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
            <Users className="h-4 w-4 mr-1 text-medical-green" />
            Shared With
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">3</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-amber-500" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">2</p>
        </CardContent>
      </Card>
    </div>
  );
}
