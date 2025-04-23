
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MedicalRecordCard from "@/components/MedicalRecordCard";
import ShareRecordModal from "@/components/ShareRecordModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Calendar, FileText, FilePlus2 } from "lucide-react";

// Mock data for demonstration
const allRecords = [
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
  {
    id: "rec127",
    title: "Dental Cleaning",
    date: "2023-07-14",
    provider: "Dr. Mark Wilson",
    type: "Dental",
    verified: true,
    blockchainId: "0x5b2c41d8e7f9053ac19d",
  },
  {
    id: "rec128",
    title: "Eye Examination",
    date: "2023-06-30",
    provider: "Vision Care Center",
    type: "Ophthalmology",
    verified: true,
    blockchainId: "0x2a7f19c4d8b6053e1c7b",
  },
  {
    id: "rec129",
    title: "Allergy Test Results",
    date: "2023-06-02",
    provider: "Allergy & Asthma Specialists",
    type: "Laboratory",
    verified: true,
    blockchainId: "0x8e5d31f7a9c2b4806d1e",
  },
  {
    id: "rec130",
    title: "Annual Gynecological Exam",
    date: "2023-05-18",
    provider: "Dr. Jessica Chen",
    type: "Physical Exam",
    verified: true,
    blockchainId: "0x1c4a8e6f5d23b907a1c8",
  }
];

const Records = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordType, setRecordType] = useState<string>("all");
  
  const handleShareRecord = (record: any) => {
    setSelectedRecord(record);
    setIsShareModalOpen(true);
  };
  
  const filteredRecords = allRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = recordType === "all" || record.type === recordType;
    return matchesSearch && matchesType;
  });
  
  const recordsByYear: Record<string, typeof allRecords> = {};
  
  filteredRecords.forEach(record => {
    const year = new Date(record.date).getFullYear().toString();
    if (!recordsByYear[year]) {
      recordsByYear[year] = [];
    }
    recordsByYear[year].push(record);
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="medical-container">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h1 className="page-title">Medical Records</h1>
            <Button className="bg-medical-purple hover:bg-purple-700">
              <FilePlus2 size={16} className="mr-1" /> Upload New Record
            </Button>
          </div>
          
          <Tabs defaultValue="all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">All Records</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search records..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={recordType} onValueChange={setRecordType}>
                  <SelectTrigger className="w-full md:w-44">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-1" />
                      <SelectValue placeholder="Record Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Physical Exam">Physical Exams</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                    <SelectItem value="Radiology">Radiology</SelectItem>
                    <SelectItem value="Immunization">Immunizations</SelectItem>
                    <SelectItem value="Dental">Dental</SelectItem>
                    <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all" className="space-y-8">
              {Object.keys(recordsByYear).sort().reverse().map(year => (
                <div key={year}>
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 mr-2 text-medical-blue" />
                    <h2 className="text-xl font-bold text-medical-dark">{year}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recordsByYear[year].map(record => (
                      <MedicalRecordCard 
                        key={record.id} 
                        {...record} 
                        onView={() => console.log("View record", record.id)}
                        onShare={() => handleShareRecord(record)}
                      />
                    ))}
                  </div>
                </div>
              ))}
              
              {Object.keys(recordsByYear).length === 0 && (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No records found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="verified">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecords.filter(r => r.verified).map(record => (
                  <MedicalRecordCard 
                    key={record.id} 
                    {...record} 
                    onView={() => console.log("View record", record.id)}
                    onShare={() => handleShareRecord(record)}
                  />
                ))}
              </div>
              
              {filteredRecords.filter(r => r.verified).length === 0 && (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No verified records found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecords.filter(r => !r.verified).map(record => (
                  <MedicalRecordCard 
                    key={record.id} 
                    {...record} 
                    onView={() => console.log("View record", record.id)}
                    onShare={() => handleShareRecord(record)}
                  />
                ))}
              </div>
              
              {filteredRecords.filter(r => !r.verified).length === 0 && (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No pending records found</h3>
                  <p className="text-gray-400">All your records are verified</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shared">
              <div className="text-center py-16">
                <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-500 mb-2">No shared records</h3>
                <p className="text-gray-400 mb-6">You haven't shared any records yet</p>
                <Button variant="outline">View All Records</Button>
              </div>
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
  );
};

export default Records;
