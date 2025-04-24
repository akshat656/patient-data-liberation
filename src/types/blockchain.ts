
export interface BlockchainTransaction {
  id: string;
  type: string;
  recordTitle: string;
  timestamp: string;
  hash: string;
  status: "confirmed" | "pending";
  recipient?: string;
}

export interface BlockchainBlock {
  number: number;
  timestamp: string;
  transactions: number;
  size: string;
  hash: string;
}

export interface VerificationResult {
  isValid: boolean;
  message: string;
}
