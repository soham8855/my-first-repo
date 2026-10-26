
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { showToast } from '@/utils/toastUtils';

// Real contract ABI from user input
const VOTING_ABI: AbiItem[] = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "votedEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "party",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "candidatesCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "getCandidate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "party",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getCandidatesCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getTotalVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

// Contract address from user input
const VOTING_CONTRACT_ADDRESS = '0xdc9cb6BD84A8BaA955651D2a7D44aDbeE7eA964f';

class BlockchainService {
  private web3: Web3 | null = null;
  private contract: any = null;
  private initialized: boolean = false;

  constructor() {
    // Try to initialize right away if window.ethereum is available
    if (typeof window !== 'undefined') {
      this.init().catch(err => {
        console.warn('BlockchainService init failed:', err.message);
      });
    }
  }

  async init(): Promise<boolean> {
    if (this.initialized) return true;
    
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        console.log('MetaMask detected, initializing Web3...');
        
        // Create a new web3 instance
        this.web3 = new Web3(window.ethereum);
        
        // Create contract instance
        this.contract = new this.web3.eth.Contract(
          VOTING_ABI,
          VOTING_CONTRACT_ADDRESS
        );
        
        this.initialized = true;
        console.log('BlockchainService initialized successfully');
        return true;
      } else {
        console.warn('MetaMask is not installed');
        showToast.warning(
          'MetaMask not detected', 
          'Please install MetaMask to use blockchain features'
        );
        return false;
      }
    } catch (error) {
      console.error('Failed to initialize BlockchainService:', error);
      return false;
    }
  }

  async requestAccount(): Promise<string | null> {
    try {
      if (!this.web3) {
        const initialized = await this.init();
        if (!initialized) return null;
      }
      
      console.log('Requesting account access from MetaMask...');
      
      // Use params explicitly to ensure the popup is triggered
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts',
        params: [] 
      });
      
      console.log('MetaMask accounts:', accounts);
      
      if (accounts && accounts.length > 0) {
        return accounts[0];
      } else {
        console.warn('No accounts returned from MetaMask');
        return null;
      }
    } catch (error) {
      console.error('User denied account access or error occurred:', error);
      return null;
    }
  }

  async castVote(candidateId: string): Promise<string | null> {
    try {
      if (!this.web3 || !this.contract) {
        const initialized = await this.init();
        if (!initialized) {
          throw new Error('Blockchain service not initialized');
        }
      }
      
      // Force a fresh account connection to ensure MetaMask popup
      await window.ethereum.request({ 
        method: 'eth_requestAccounts',
        params: [] 
      });
      
      // Short delay to ensure MetaMask has processed the account request
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const accounts = await this.web3!.eth.getAccounts();
      const account = accounts[0];
      
      if (!account) {
        throw new Error('No accounts available. User may have denied access.');
      }
      
      console.log('Active account for transaction:', account);
      
      // Convert string candidateId to number for contract interaction
      const numericCandidateId = parseInt(candidateId.replace('candidate-', ''), 10);
      
      if (isNaN(numericCandidateId)) {
        throw new Error(`Invalid candidate ID: ${candidateId}`);
      }
      
      console.log(`Sending vote transaction for candidate ID ${numericCandidateId} from account ${account}`);
      
      // Send transaction to vote using the numeric ID
      // Use the specific contract method and explicitly use params to trigger MetaMask
      const result = await this.contract.methods.vote(numericCandidateId).send({
        from: account,
        gas: 200000, // Gas limit
        gasPrice: undefined // Let MetaMask determine the gas price
      });
      
      console.log('Vote transaction successful:', result);
      return result.transactionHash;
    } catch (error) {
      console.error('Error casting vote on blockchain:', error);
      throw error;
    }
  }

  async checkIfVoted(address: string): Promise<boolean> {
    if (!this.web3 || !this.contract) {
      const initialized = await this.init();
      if (!initialized) {
        throw new Error('Blockchain service not initialized');
      }
    }
    
    try {
      return await this.contract.methods.hasVoted(address).call();
    } catch (error) {
      console.error('Error checking if voter has voted:', error);
      return false;
    }
  }

  async getTotalVotes(): Promise<number> {
    if (!this.web3 || !this.contract) {
      const initialized = await this.init();
      if (!initialized) {
        throw new Error('Blockchain service not initialized');
      }
    }
    
    try {
      const totalVotes = await this.contract.methods.getTotalVotes().call();
      return parseInt(totalVotes, 10);
    } catch (error) {
      console.error('Error getting total votes:', error);
      return 0;
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

// Create and export a singleton instance
export const blockchainService = new BlockchainService();
export default blockchainService;
