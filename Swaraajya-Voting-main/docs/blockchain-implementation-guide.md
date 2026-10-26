
# BlockVote Blockchain Implementation Guide

This document provides technical references for developers who want to extend the blockchain implementation in BlockVote.

## Smart Contract Interface

The voting contract implements the following core functions:

```solidity
// Cast a vote for a candidate
function vote(uint256 _candidateId) public;

// Check if an address has already voted
function hasVoted(address _voter) public view returns (bool);

// Get the total number of votes cast
function getTotalVotes() public view returns (uint256);

// Get details about a specific candidate
function getCandidate(uint256 _candidateId) public view returns (uint, string memory, string memory, uint);

// Get the total number of candidates
function getCandidatesCount() public view returns (uint256);
```

## Web3 Integration

The application uses Web3.js to interact with the blockchain. The key components are:

1. **BlockchainService** (`src/services/blockchainService.ts`):
   - Manages the connection to MetaMask
   - Handles contract interactions
   - Provides methods for voting and querying blockchain data

2. **Contract Initialization**:
   ```typescript
   this.web3 = new Web3(window.ethereum);
   this.contract = new this.web3.eth.Contract(
     VOTING_ABI,
     VOTING_CONTRACT_ADDRESS
   );
   ```

3. **Wallet Connection**:
   ```typescript
   async requestAccount(): Promise<string | null> {
     const accounts = await window.ethereum.request({ 
       method: 'eth_requestAccounts',
       params: [] 
     });
     return accounts[0];
   }
   ```

4. **Vote Casting**:
   ```typescript
   async castVote(candidateId: string): Promise<string | null> {
     // Convert string ID to numeric ID
     const numericCandidateId = parseInt(candidateId.replace('candidate-', ''), 10);
     
     // Get user account
     const accounts = await this.web3!.eth.getAccounts();
     
     // Send transaction
     const result = await this.contract.methods.vote(numericCandidateId).send({
       from: accounts[0],
       gas: 200000
     });
     
     return result.transactionHash;
   }
   ```

## Adding New Blockchain Features

To extend the blockchain functionality:

1. **Add New Contract Functions**:
   - Add the function to the Solidity contract
   - Recompile and redeploy
   - Update the ABI in your application

2. **Implement New Service Methods**:
   - Add methods to `blockchainService.ts`
   - Handle data conversion between application and blockchain formats
   - Implement proper error handling

3. **Update UI Components**:
   - Add UI elements to interact with new blockchain features
   - Implement loading and error states
   - Add transaction confirmation flows

## Testing Blockchain Features

For local testing:

1. **Use Ganache Snapshots**:
   - Create a Ganache workspace with snapshots enabled
   - Take snapshots before testing
   - Revert to snapshots to reset blockchain state

2. **Console Logging**:
   ```typescript
   console.log('Transaction hash:', result.transactionHash);
   console.log('Gas used:', result.gasUsed);
   
   // Event logging
   this.contract.events.votedEvent({}, (error, event) => {
     console.log('Vote event:', event);
   });
   ```

3. **MetaMask Debugging**:
   - Use MetaMask's activity tab to verify transactions
   - Check for failed transactions and gas issues
   - Use MetaMask's advanced reset feature for testing

## Production Considerations

When moving to production:

1. **Network Selection**:
   - Choose appropriate test networks (Sepolia, Mumbai) before mainnet
   - Update RPC URLs and contract addresses

2. **Gas Optimization**:
   - Minimize on-chain storage
   - Batch operations where possible
   - Test gas costs under various conditions

3. **Security Hardening**:
   - Implement additional verification steps
   - Add safeguards against front-running
   - Consider multisig for admin functions

4. **Error Handling**:
   - Implement comprehensive error handling
   - Provide user-friendly error messages
   - Add fallback mechanisms
