
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BlockchainBlock } from "@/types/blockchain";

interface BlocksListProps {
  blocks: BlockchainBlock[];
}

export default function BlocksList({ blocks }: BlocksListProps) {
  const formatHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  };

  return (
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
          {blocks.map((block) => (
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
  );
}
