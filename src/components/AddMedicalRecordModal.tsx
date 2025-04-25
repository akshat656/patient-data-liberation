
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BlockchainTransaction } from "@/types/blockchain";

interface AddMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecord: (record: any) => void;
}

export default function AddMedicalRecordModal({ isOpen, onClose, onAddRecord }: AddMedicalRecordModalProps) {
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [recordType, setRecordType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate a random blockchain ID for demo purposes
    const blockchainId = `0x${Array.from({ length: 20 }, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    // Create new record object
    const newRecord = {
      id: `rec${Date.now().toString().slice(-6)}`,
      title,
      provider,
      type: recordType,
      date: new Date().toISOString().split("T")[0],
      verified: false,
      blockchainId
    };

    // Simulate blockchain transaction
    setTimeout(() => {
      setIsSubmitting(false);
      onAddRecord(newRecord);
      toast({
        title: "Record added successfully",
        description: "Your medical record has been uploaded and is pending verification."
      });
      resetForm();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setTitle("");
    setProvider("");
    setRecordType("");
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Medical Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Record Title</Label>
              <Input 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Annual Physical Examination" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Healthcare Provider</Label>
              <Input 
                id="provider" 
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                placeholder="Dr. Sarah Johnson" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Record Type</Label>
              <Select value={recordType} onValueChange={setRecordType} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physical Exam">Physical Exam</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="Radiology">Radiology</SelectItem>
                  <SelectItem value="Immunization">Immunization</SelectItem>
                  <SelectItem value="Dental">Dental</SelectItem>
                  <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <Input 
                id="file" 
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!title || !provider || !recordType || !file || isSubmitting}
              className="bg-medical-purple hover:bg-purple-700"
            >
              {isSubmitting ? "Uploading..." : "Upload Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
