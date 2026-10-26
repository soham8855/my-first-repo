
import { ExternalLink } from 'lucide-react';

interface BlockchainTransactionLinkProps {
  transactionHash: string;
  chainId?: number;
}

const BlockchainTransactionLink = ({ 
  transactionHash, 
  chainId = 1337 // Default to Ganache local chain ID
}: BlockchainTransactionLinkProps) => {
  // Get the appropriate block explorer URL based on chain ID
  const getExplorerUrl = () => {
    // For Ganache, we don't have a block explorer, so just return a placeholder
    if (chainId === 1337) {
      return null;
    }
    
    // For real networks
    switch (chainId) {
      case 1: // Ethereum Mainnet
        return `https://etherscan.io/tx/${transactionHash}`;
      case 5: // Goerli Testnet
        return `https://goerli.etherscan.io/tx/${transactionHash}`;
      case 11155111: // Sepolia Testnet
        return `https://sepolia.etherscan.io/tx/${transactionHash}`;
      case 137: // Polygon Mainnet
        return `https://polygonscan.com/tx/${transactionHash}`;
      case 80001: // Mumbai Testnet
        return `https://mumbai.polygonscan.com/tx/${transactionHash}`;
      default:
        return null;
    }
  };
  
  const explorerUrl = getExplorerUrl();
  
  if (chainId === 1337 || !explorerUrl) {
    return (
      <div className="text-sm text-muted-foreground">
        Transaction Hash: <span className="font-mono">{transactionHash.substring(0, 10)}...{transactionHash.substring(transactionHash.length - 6)}</span>
        <p className="text-xs mt-1">
          (Ganache local blockchain - no block explorer available)
        </p>
      </div>
    );
  }
  
  return (
    <a 
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
    >
      View transaction on block explorer
      <ExternalLink className="h-3 w-3" />
    </a>
  );
};

export default BlockchainTransactionLink;
