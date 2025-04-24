
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AppointmentCard } from "./AppointmentCard";
import MedicalRecordCard from "@/components/MedicalRecordCard";
import BlockchainStatus from "@/components/BlockchainStatus";

interface DashboardTabsProps {
  recentRecords: any[];
  upcomingAppointments: any[];
  onShareRecord: (record: any) => void;
}

export function DashboardTabs({ recentRecords, upcomingAppointments, onShareRecord }: DashboardTabsProps) {
  return (
    <Tabs defaultValue="records">
      <TabsList className="mb-6">
        <TabsTrigger value="records">Recent Records</TabsTrigger>
        <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
        <TabsTrigger value="blockchain">Blockchain Status</TabsTrigger>
      </TabsList>
      
      <TabsContent value="records">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentRecords.map((record) => (
            <MedicalRecordCard 
              key={record.id} 
              {...record} 
              onView={() => console.log("View record", record.id)}
              onShare={() => onShareRecord(record)}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link to="/records">
              View All Medical Records <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="appointments">
        <div className="space-y-4">
          {upcomingAppointments.map((apt) => (
            <AppointmentCard key={apt.id} {...apt} />
          ))}
          
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link to="/appointments">
                Manage Appointments <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="blockchain">
        <BlockchainStatus 
          totalRecords={24} 
          verifiedRecords={21} 
          lastSync="Today, 2:35 PM" 
        />
      </TabsContent>
    </Tabs>
  );
}
