
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockchainStatus from "@/components/BlockchainStatus";
import { ArrowRight, Search, Shield, Activity, Clock, FileCheck } from "lucide-react";

// Mock blockchain transactions
const blockchainTransactions = [
  {
    id: "tx123",
    type: "Record Added",
    recordTitle: "Annual Physical Examination",
    timestamp: "2023-11-15T14:32:10",
    hash: "0x7e4d86b59b1b0375fc97c88d2915b5e76c325163a8901957742d1ed2fb32bbb7",
    status: "confirmed"
  },
  {
    id: "tx124",
    type: "Record Verified",
    recordTitle: "Blood Test Results",
    timestamp: "2023-10-28T09:15:22",
    hash: "0x3f8c49a2d7c4851df63b8e73d9614d0f9e072e349c2df5fa652084820da3cc95",
    status: "confirmed"
  },
  {
    id: "tx125",
    type: "Access Granted",
    recordTitle: "MRI Scan - Right Knee",
    timestamp: "2023-08-22T16:45:38",
    recipient: "Dr. James Wilson",
    hash: "0x9a1e73c48fb5062db71c8d229325e761a9c35a902def8c8c93b915ce9a835d20",
    status: "confirmed"
  },
  {
    id: "tx126",
    type: "Record Updated",
    recordTitle: "Allergy Test Results",
    timestamp: "2023-06-03T11:22:05",
    hash: "0x2c7f19b4d8e6a53bc19d7a2e4f6c8b1d5a3e9c7f2b4d6e8a1c3b5d7f9e1c3b5d",
    status: "pending"
  },
];

// Mock blockchain blocks
const blockchainBlocks = [
  {
    number: 2456789,
    timestamp: "2023-11-15T14:35:10",
    transactions: 24,
    size: "1.2 MB",
    hash: "0x7e4d86b59b1b0375fc97c88d2915b5e76c325163a8901957742d1ed2fb32bbb7"
  },
  {
    number: 2456788,
    timestamp: "2023-11-15T14:30:05",
    transactions: 18,
    size: "0.9 MB",
    hash: "0x3f8c49a2d7c4851df63b8e73d9614d0f9e072e349c2df5fa652084820da3cc95"
  },
  {
    number: 2456787,
    timestamp: "2023-11-15T14:25:22",
    transactions: 32,
    size: "1.5 MB",
    hash: "0x9a1e73c48fb5062db71c8d229325e761a9c35a902def8c8c93b915ce9a835d20"
  }
];

const Blockchain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const formatHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="medical-container">
          <h1 className="page-title">Blockchain Status</h1>
          
          <div className="mb-8">
            <BlockchainStatus 
              totalRecords={24} 
              verifiedRecords={21} 
              lastSync="Today, 2:35 PM" 
            />
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title">Verify Record</h2>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Enter record ID or blockchain hash..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button className="bg-medical-green hover:bg-green-700">
                    <Shield className="h-4 w-4 mr-1" /> Verify Authenticity
                  </Button>
                </div>
                
                <div className="flex items-center mt-4 bg-blue-50 text-blue-800 p-3 rounded-md">
                  <FileCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">
                    Enter a record ID or blockchain hash to verify its authenticity and integrity on the blockchain.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="transactions">
            <TabsList className="mb-6">
              <TabsTrigger value="transactions">Blockchain Transactions</TabsTrigger>
              <TabsTrigger value="blocks">Recent Blocks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="space-y-4">
              {blockchainTransactions.map((tx) => (
                <Card key={tx.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className={`w-full md:w-1 ${
                        tx.status === "confirmed" ? "bg-medical-green" : "bg-amber-500"
                      }`}></div>
                      <div className="p-4 md:p-5 w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center">
                            <Activity className="h-4 w-4 text-medical-purple mr-2" />
                            <h3 className="font-medium">{tx.type}</h3>
                            <span className="bg-medical-purple/10 text-medical-purple text-xs px-2 py-0.5 rounded ml-2">
                              {tx.status}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(tx.timestamp).toLocaleString()}
                          </div>
                        </div>
                        
                        <p className="text-sm mb-2">
                          <span className="font-medium text-gray-500">Record: </span>
                          {tx.recordTitle}
                          {tx.recipient && (
                            <span className="ml-2">
                              <ArrowRight className="h-3 w-3 mx-1 inline" />
                              {tx.recipient}
                            </span>
                          )}
                        </p>
                        
                        <div className="bg-gray-50 p-2 rounded font-mono text-xs overflow-x-auto">
                          {tx.hash}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="blocks">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Block</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Txs</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Size</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {blockchainBlocks.map((block) => (
                      <tr key={block.number} className="bg-white hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-medical-purple">
                          #{block.number.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(block.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {block.transactions}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {block.size}
                        </td>
                        <td className="px-4 py-3 text-xs font-mono text-gray-500">
                          {formatHash(block.hash)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blockchain;
