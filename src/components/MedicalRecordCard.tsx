
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FileText, Share2, Shield, ExternalLink } from "lucide-react";

interface MedicalRecordCardProps {
  id: string;
  title: string;
  date: string;
  provider: string;
  type: string;
  verified: boolean;
  blockchainId?: string;
  onView?: () => void;
  onShare?: () => void;
}

const MedicalRecordCard = ({
  id,
  title,
  date,
  provider,
  type,
  verified,
  blockchainId,
  onView,
  onShare
}: MedicalRecordCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-medical-dark">{title}</CardTitle>
            <CardDescription>{new Date(date).toLocaleDateString()}</CardDescription>
          </div>
          <Badge className={verified ? "bg-medical-green" : "bg-orange-400"}>
            {verified ? (
              <Shield className="h-3 w-3 mr-1" />
            ) : null}
            {verified ? "Verified" : "Pending"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Provider:</span>
            <span className="text-medical-dark">{provider}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Type:</span>
            <span className="text-medical-dark">{type}</span>
          </div>
          {blockchainId && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-500">Blockchain ID:</span>
              <span className="text-xs bg-gray-100 rounded px-2 py-1 font-mono">
                {blockchainId.substring(0, 6)}...{blockchainId.substring(blockchainId.length - 4)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-medical-blue border-medical-blue" 
          onClick={onView}
        >
          <FileText className="h-4 w-4 mr-1" /> View
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onShare}
        >
          <Share2 className="h-4 w-4 mr-1" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicalRecordCard;
