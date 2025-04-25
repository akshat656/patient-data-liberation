
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentCard } from "./AppointmentCard";
import MedicalRecordCard from "@/components/MedicalRecordCard";

interface DashboardTabsProps {
  recentRecords: any[];
  upcomingAppointments: any[];
  onShareRecord: (record: any) => void;
  onViewRecord: (record: any) => void;
}

export function DashboardTabs({ 
  recentRecords, 
  upcomingAppointments, 
  onShareRecord,
  onViewRecord 
}: DashboardTabsProps) {
  return (
    <Tabs defaultValue="records" className="space-y-4">
      <TabsList>
        <TabsTrigger value="records">Recent Records</TabsTrigger>
        <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
        <TabsTrigger value="reminders">Reminders</TabsTrigger>
      </TabsList>
      
      <TabsContent value="records" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentRecords.slice(0, 3).map(record => (
            <MedicalRecordCard 
              key={record.id} 
              {...record} 
              onView={() => onViewRecord(record)}
              onShare={() => onShareRecord(record)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="appointments">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingAppointments.map(appointment => (
            <AppointmentCard key={appointment.id} {...appointment} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="reminders">
        <Card>
          <CardHeader>
            <CardTitle>Health Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <p>No active reminders at this time.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
