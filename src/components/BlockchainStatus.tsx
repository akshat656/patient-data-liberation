
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, Clock, Database, Shield } from "lucide-react";

interface BlockStatusProps {
  totalRecords: number;
  verifiedRecords: number;
  lastSync: string;
}

const BlockchainStatus = ({ totalRecords, verifiedRecords, lastSync }: BlockStatusProps) => {
  const percentVerified = totalRecords > 0 ? Math.round((verifiedRecords / totalRecords) * 100) : 0;

  return (
    <div className="space-y-4">
      <h2 className="section-title">Blockchain Status</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Database className="h-4 w-4 mr-1 text-medical-purple" />
              Total Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalRecords}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-medical-green" />
              Verified Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold">{verifiedRecords}</p>
              <span className="ml-2 text-medical-green text-sm font-medium">
                ({percentVerified}%)
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Clock className="h-4 w-4 mr-1 text-blue-500" />
              Last Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-md font-medium">{lastSync}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gradient-to-r from-medical-blue/10 to-medical-purple/10">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-medical-purple/20 flex items-center justify-center mr-4">
              <Activity className="h-6 w-6 text-medical-purple" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-medical-dark">Network Status: Active</h3>
              <p className="text-sm text-gray-600">
                Your records are being securely synchronized across our decentralized network.
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-medical-green mr-2" />
              <span className="text-sm">
                <span className="font-medium">256-bit encryption</span>
                <span className="text-gray-600 ml-1">protects your medical data</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainStatus;
