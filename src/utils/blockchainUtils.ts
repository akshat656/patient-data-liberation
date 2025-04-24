
import { VerificationResult } from "@/types/blockchain";

export const verifyBlockchainRecord = (idOrHash: string): Promise<VerificationResult> => {
  // This is a mock verification function
  // In a real application, this would make an API call to verify the record
  return new Promise((resolve) => {
    setTimeout(() => {
      const isValid = idOrHash.length > 10; // Mock validation
      resolve({
        isValid,
        message: isValid 
          ? "Record verified successfully on the blockchain" 
          : "Could not verify record. Please check the ID or hash and try again"
      });
    }, 500);
  });
};

export const searchBlockchainData = <T extends Record<string, any>>(
  data: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] => {
  if (!searchTerm) return data;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return data.filter(item =>
    fields.some(field =>
      String(item[field])?.toLowerCase().includes(lowerSearchTerm)
    )
  );
};
