
import { useState } from "react";
import { Search, Activity, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { searchBlockchainData } from "@/utils/blockchainUtils";
import { BlockchainTransaction } from "@/types/blockchain";

interface TransactionsListProps {
  transactions: BlockchainTransaction[];
  itemsPerPage?: number;
}

export default function TransactionsList({ 
  transactions,
  itemsPerPage = 3 
}: TransactionsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = searchBlockchainData(
    transactions,
    searchTerm,
    ['recordTitle', 'type', 'hash']
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Search transactions..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {paginatedTransactions.map((tx) => (
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

      {filteredTransactions.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(p => Math.max(1, p - 1));
                }}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                }}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
