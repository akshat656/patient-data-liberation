
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Mail, Users } from "lucide-react";

interface ShareRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordTitle: string;
}

const ShareRecordModal = ({ isOpen, onClose, recordTitle }: ShareRecordModalProps) => {
  const [shareMethod, setShareMethod] = useState<"email" | "link">("email");
  const [email, setEmail] = useState("");
  const [expirationDays, setExpirationDays] = useState(7);
  const [allowDownload, setAllowDownload] = useState(true);

  const handleShare = () => {
    // Implementation for sharing would go here
    console.log({
      method: shareMethod,
      email,
      expirationDays,
      allowDownload,
      recordTitle
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Medical Record</DialogTitle>
          <DialogDescription>
            Share "{recordTitle}" with healthcare providers or other authorized parties.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <RadioGroup 
            defaultValue={shareMethod} 
            onValueChange={(value) => setShareMethod(value as "email" | "link")}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email" className="flex items-center cursor-pointer">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="link" id="link" />
              <Label htmlFor="link" className="flex items-center cursor-pointer">
                <Users className="h-4 w-4 mr-2" />
                Generate Link
              </Label>
            </div>
          </RadioGroup>

          {shareMethod === "email" ? (
            <div className="space-y-2">
              <Label htmlFor="email">Recipient Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="doctor@hospital.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="expiration" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" /> 
              Access Expiration
            </Label>
            <select 
              id="expiration" 
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={expirationDays}
              onChange={(e) => setExpirationDays(Number(e.target.value))}
            >
              <option value={1}>24 hours</option>
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={0}>No expiration</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="allowDownload" 
              checked={allowDownload} 
              onCheckedChange={(checked) => setAllowDownload(Boolean(checked))} 
            />
            <label
              htmlFor="allowDownload"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Allow recipient to download record
            </label>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleShare} className="bg-medical-purple hover:bg-purple-700">
            Share Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareRecordModal;
