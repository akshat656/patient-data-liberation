
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareRecordModal from "@/components/ShareRecordModal";
import AddMedicalRecordModal from "@/components/AddMedicalRecordModal";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Define a type for our medical records
interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  provider: string;
  type: string;
  verified: boolean;
  blockchainId?: string;
  fileData?: string;
  fileName?: string;
}

// Mock data for demonstration
const recentRecords: MedicalRecord[] = [
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>(() => {
    // Try to load records from localStorage on initial load
    const savedRecords = localStorage.getItem('medicalRecords');
    return savedRecords ? JSON.parse(savedRecords) : recentRecords;
  });
  const { toast } = useToast();
  
  const handleShareRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsShareModalOpen(true);
  };
  
  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
    console.log("View record", record.id);
  };
  
  const handleAddRecord = (newRecord: MedicalRecord) => {
    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    
    // Save to localStorage to persist across page navigation
    localStorage.setItem('medicalRecords', JSON.stringify(updatedRecords));
    
    toast({
      title: "Record added successfully",
      description: "Your medical record has been uploaded and is pending verification."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Patient Dashboard</h1>
            <Button 
              className="bg-medical-purple hover:bg-purple-700"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={16} className="mr-1" /> Add New Record
            </Button>
          </div>
          
          <QuickStats />
          <DashboardTabs 
            recentRecords={records}
            upcomingAppointments={upcomingAppointments}
            onShareRecord={handleShareRecord}
            onViewRecord={handleViewRecord}
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
      
      {selectedRecord && (
        <Dialog 
          open={isViewModalOpen} 
          onOpenChange={(open) => !open && setIsViewModalOpen(false)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <div className="py-6">
              <h2 className="text-2xl font-bold mb-4">{selectedRecord.title}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-medium text-gray-500">Date:</span>
                  <span>{new Date(selectedRecord.date).toLocaleDateString()}</span>
                  
                  <span className="font-medium text-gray-500">Provider:</span>
                  <span>{selectedRecord.provider}</span>
                  
                  <span className="font-medium text-gray-500">Type:</span>
                  <span>{selectedRecord.type}</span>
                  
                  <span className="font-medium text-gray-500">Status:</span>
                  <span className={selectedRecord.verified ? "text-green-600" : "text-orange-500"}>
                    {selectedRecord.verified ? "Verified" : "Pending Verification"}
                  </span>
                  
                  {selectedRecord.blockchainId && (
                    <>
                      <span className="font-medium text-gray-500">Blockchain ID:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {selectedRecord.blockchainId}
                      </span>
                    </>
                  )}
                </div>
                
                {selectedRecord.fileData && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Record File:</h3>
                    {selectedRecord.fileData.startsWith('data:image') ? (
                      <div className="border rounded-md overflow-hidden">
                        <img 
                          src={selectedRecord.fileData} 
                          alt={selectedRecord.fileName} 
                          className="max-w-full h-auto"
                        />
                      </div>
                    ) : (
                      <div className="border rounded-md p-4 bg-gray-50">
                        <p className="text-sm">
                          {selectedRecord.fileName} - File preview not available
                        </p>
                        <a 
                          href={selectedRecord.fileData}
                          download={selectedRecord.fileName}
                          className="text-medical-blue hover:underline text-sm flex items-center mt-2"
                        >
                          Download File
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      <AddMedicalRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRecord={handleAddRecord}
      />
    </div>
  );
};

export default Dashboard;
