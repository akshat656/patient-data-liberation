
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareRecordModal from "@/components/ShareRecordModal";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

// Mock data for demonstration
const recentRecords = [
  {
    id: "rec123",
    title: "Annual Physical Examination",
    date: "2023-11-15",
    provider: "Dr. Sarah Johnson",
    type: "Physical Exam",
    verified: true,
    blockchainId: "0x7e4d86b59b1b0375fc97c",
  },
  {
    id: "rec124",
    title: "Blood Test Results",
    date: "2023-10-28",
    provider: "Regional Medical Lab",
    type: "Laboratory",
    verified: true,
    blockchainId: "0x3f8c49a2d7c4851df63b8",
  },
  {
    id: "rec125",
    title: "COVID-19 Vaccination",
    date: "2023-09-05",
    provider: "City Health Department",
    type: "Immunization",
    verified: true,
    blockchainId: "0x9a1e73c48fb5062db71c",
  },
  {
    id: "rec126",
    title: "MRI Scan - Right Knee",
    date: "2023-08-22",
    provider: "Imaging Center",
    type: "Radiology",
    verified: false,
  },
];

const upcomingAppointments = [
  {
    id: "apt123",
    provider: "Dr. Michael Chang",
    specialty: "Cardiology",
    date: "2023-12-05T14:30:00",
    location: "Heart Health Clinic"
  },
  {
    id: "apt124",
    provider: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    date: "2023-12-10T10:15:00",
    location: "Skin Care Center"
  }
];

const Dashboard = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  
  const handleShareRecord = (record: any) => {
    setSelectedRecord(record);
    setIsShareModalOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          
          <main className="flex-grow py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Patient Dashboard</h1>
                <Button className="bg-medical-purple hover:bg-purple-700">
                  <Plus size={16} className="mr-1" /> Add New Record
                </Button>
              </div>
              
              <QuickStats />
              <DashboardTabs 
                recentRecords={recentRecords}
                upcomingAppointments={upcomingAppointments}
                onShareRecord={handleShareRecord}
              />
            </div>
          </main>
          
          <Footer />
          
          {selectedRecord && (
            <ShareRecordModal 
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              recordTitle={selectedRecord.title}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
