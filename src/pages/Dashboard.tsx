import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowRight, Clock, FileText, Stethoscope, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MedicalRecordCard from "@/components/MedicalRecordCard";
import BlockchainStatus from "@/components/BlockchainStatus";
import ShareRecordModal from "@/components/ShareRecordModal";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

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
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          
          <main className="flex-grow py-8">
            <div className="medical-container">
              <div className="flex flex-wrap items-center justify-between mb-8">
                <h1 className="page-title">Patient Dashboard</h1>
                <Button className="bg-medical-purple hover:bg-purple-700">
                  <Plus size={16} className="mr-1" /> Add New Record
                </Button>
              </div>
              
              {/* Quick Stats */}
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
                        onShare={() => handleShareRecord(record)}
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
                      <Card key={apt.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center mr-4">
                              <Stethoscope className="h-6 w-6 text-medical-blue" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">{apt.provider}</h3>
                              <p className="text-gray-500">{apt.specialty} • {apt.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {new Date(apt.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-500">
                              {new Date(apt.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
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
