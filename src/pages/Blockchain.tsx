import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockchainStatus from "@/components/BlockchainStatus";
import VerificationForm from "@/components/blockchain/VerificationForm";
import TransactionsList from "@/components/blockchain/TransactionsList";
import BlocksList from "@/components/blockchain/BlocksList";
import { BlockchainTransaction, BlockchainBlock } from "@/types/blockchain";

// Mock blockchain transactions
const blockchainTransactions: BlockchainTransaction[] = [
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
const blockchainBlocks: BlockchainBlock[] = [
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
            <VerificationForm />
          </div>
          
          <Tabs defaultValue="transactions">
            <TabsList className="mb-6">
              <TabsTrigger value="transactions">Blockchain Transactions</TabsTrigger>
              <TabsTrigger value="blocks">Recent Blocks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <TransactionsList transactions={blockchainTransactions} />
            </TabsContent>
            
            <TabsContent value="blocks">
              <BlocksList blocks={blockchainBlocks} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blockchain;
