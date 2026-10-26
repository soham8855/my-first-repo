
# E-Swarajya

A secure, transparent voting system powered by blockchain technology.

## Features

- **Blockchain-based voting**: Secure, tamper-proof vote recording using Ethereum blockchain
- **Admin Dashboard**: Manage candidates, parties, and voters
- **Real-time Results**: View election results with visual charts
- **Voter Authentication**: Secure login with Aadhaar verification
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

To run this project locally:

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/e-swarajya.git
   cd e-swarajya
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

## Blockchain Setup Guide

This application integrates with Ethereum blockchain for secure voting. Follow these steps to set up the blockchain integration:

### Prerequisites

1. **Install Node.js and npm** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install MetaMask**
   - Download the [MetaMask extension](https://metamask.io/download/) for your browser
   - Create or import a wallet

3. **Install Ganache for local blockchain**
   - Download [Ganache](https://trufflesuite.com/ganache/) for a local Ethereum blockchain
   - Launch Ganache and create a new workspace

4. **Install Truffle globally**
   ```bash
   npm install -g truffle
   ```

### Setting Up Local Blockchain

1. **Launch Ganache**:
   - Start Ganache and create a new workspace
   - Note the RPC Server URL (default: `HTTP://127.0.0.1:7545`)
   - Note the Network ID (typically `5777` or `1337`)

2. **Configure MetaMask to use Ganache**:
   - Open MetaMask and add a new network:
     - Network Name: `Ganache Local`
     - New RPC URL: `http://127.0.0.1:7545`
     - Chain ID: `1337` (or match what Ganache shows)
     - Currency Symbol: `ETH`
   - Import a Ganache account to MetaMask:
     - In Ganache, click the key icon next to an account to copy its private key
     - In MetaMask: Account menu → Import Account → paste the private key

### Deploying the Smart Contract

1. **Create a blockchain directory in your project**:
   ```bash
   mkdir -p blockchain/contracts
   cd blockchain
   truffle init
   ```

2. **Create the voting smart contract**:
   Create a file `contracts/Voting.sol`:

   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   contract Voting {
       // Struct for candidate data
       struct Candidate {
           uint id;
           string name;
           string party;
           uint voteCount;
       }

       // Store accounts that have voted
       mapping(address => bool) public voters;
       
       // Store Candidates
       mapping(uint => Candidate) public candidates;
       
       // Store Candidates Count
       uint public candidatesCount;
       
       // Store total votes
       uint public totalVotes;
       
       // Event triggered when a vote is cast
       event votedEvent(uint indexed _candidateId);

       constructor() {
           // Initialize with some default candidates
           // In a real app, you would add an admin function to add candidates
           addCandidate("Candidate 1", "Party A");
           addCandidate("Candidate 2", "Party B");
           addCandidate("Candidate 3", "Party C");
       }

       function addCandidate(string memory _name, string memory _party) private {
           candidatesCount++;
           candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, 0);
       }

       function vote(uint _candidateId) public {
           // Check if voter hasn't voted before
           require(!voters[msg.sender], "You have already voted");
           
           // Check if candidate exists
           require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");

           // Record that voter has voted
           voters[msg.sender] = true;
           
           // Update candidate vote count
           candidates[_candidateId].voteCount++;
           
           // Update total votes
           totalVotes++;
           
           // Trigger voted event
           emit votedEvent(_candidateId);
       }

       function getCandidate(uint _candidateId) public view returns (uint id, string memory name, string memory party, uint voteCount) {
           require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
           Candidate memory c = candidates[_candidateId];
           return (c.id, c.name, c.party, c.voteCount);
       }

       function getCandidatesCount() public view returns (uint) {
           return candidatesCount;
       }

       function getTotalVotes() public view returns (uint) {
           return totalVotes;
       }

       function hasVoted(address _voter) public view returns (bool) {
           return voters[_voter];
       }
   }
   ```

3. **Configure Truffle**:
   Edit `truffle-config.js`:

   ```javascript
   module.exports = {
     networks: {
       development: {
         host: "127.0.0.1",
         port: 7545,
         network_id: "*", // Match any network id
       },
     },
     compilers: {
       solc: {
         version: "0.8.17",
       },
     },
   };
   ```

4. **Create Migration Script**:
   Create `migrations/2_deploy_voting.js`:

   ```javascript
   const Voting = artifacts.require("Voting");

   module.exports = function(deployer) {
     deployer.deploy(Voting);
   };
   ```

5. **Compile and Deploy the Contract**:
   ```bash
   truffle compile
   truffle migrate --reset
   ```

6. **Note the Contract Address**:
   After deployment, you'll see the contract address in the console. Copy this for the next step.

### Connecting the App to Your Contract

1. **Update Contract Address**:
   Edit `src/services/blockchainService.ts` and update:

   ```typescript
   const VOTING_CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
   ```

2. **Update Application Configuration**:
   You may need to update the ABI if you modified the contract. The ABI can be found in `blockchain/build/contracts/Voting.json` after compilation.

### Testing the Integration

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Connect to MetaMask**:
   - Ensure MetaMask is unlocked and connected to your Ganache network
   - On the Voter Dashboard, you should see a prompt to connect your wallet
   - After connecting, you'll be able to cast votes on the blockchain

### Troubleshooting

- **MetaMask connection issues**:
  - Make sure Ganache is running
  - Check that MetaMask is connected to the correct RPC URL
  - Try resetting your account in MetaMask (Settings → Advanced → Reset Account)

- **Transaction failures**:
  - Check the browser console for error messages
  - Ensure your MetaMask account has enough ETH for gas fees

- **Contract interaction errors**:
  - Verify the contract address in `blockchainService.ts`
  - Make sure the ABI matches your deployed contract

## Deploying to a Test Network

For a more realistic test, you can deploy to a testnet like Sepolia:

1. **Get some test ETH**:
   - Use a faucet like [sepoliafaucet.com](https://sepoliafaucet.com/)

2. **Configure Truffle for Sepolia**:
   Update `truffle-config.js` with your MetaMask seed phrase (use environment variables in production):

   ```javascript
   const HDWalletProvider = require('@truffle/hdwallet-provider');
   const mnemonic = "your metamask seed phrase";

   module.exports = {
     networks: {
       // ... keep development network
       sepolia: {
         provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID`),
         network_id: 11155111,
         gas: 5500000,
         confirmations: 2,
         timeoutBlocks: 200,
         skipDryRun: true
       },
     },
     // ... rest of config
   };
   ```

3. **Deploy to Sepolia**:
   ```bash
   npm install @truffle/hdwallet-provider
   truffle migrate --network sepolia
   ```

4. **Update the contract address** in your application to the newly deployed contract address.

## License

MIT
