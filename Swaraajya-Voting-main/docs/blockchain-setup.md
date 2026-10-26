
# Blockchain Integration Setup Guide

This guide provides instructions on how to properly set up the blockchain integration for your voting application.

## Prerequisites

1. Install [MetaMask](https://metamask.io/download/) browser extension
2. Set up a compatible blockchain network (Ethereum, Polygon, or a local development blockchain)
3. Deploy the voting smart contract to your chosen network
4. Have some test ETH in your MetaMask wallet for gas fees

## Local Blockchain Setup with Ganache

1. **Install Ganache**:
   - Download and install [Ganache](https://trufflesuite.com/ganache/)
   - Launch and create a new workspace
   - Note the RPC Server URL (typically `HTTP://127.0.0.1:7545`)
   - Note the Network ID (typically `5777` or `1337`)

2. **Configure MetaMask for Ganache**:
   - Add a new network in MetaMask with these details:
     - Network Name: `Ganache Local`
     - New RPC URL: `http://127.0.0.1:7545`
     - Chain ID: `1337` (or match Ganache's value)
     - Currency Symbol: `ETH`
   - Import a Ganache account to MetaMask:
     - In Ganache, click the key icon next to an account
     - Copy the private key
     - In MetaMask: click account icon → Import Account → paste key

3. **Install Development Tools**:
   ```bash
   npm install -g truffle
   ```

## Smart Contract Deployment

Refer to the main README.md file for detailed instructions on deploying the smart contract using Truffle.

## Configuration Steps

After deploying the contract:

1. **Update Contract Address**:
   - Note the deployed contract address from Truffle
   - Update it in `src/services/blockchainService.ts`

2. **Test Your Connection**:
   - Ensure your MetaMask wallet is unlocked
   - Verify you have sufficient ETH for gas fees
   - Try a test transaction to confirm network connectivity

## Candidate ID Formatting

Important: The application handles candidate IDs in string format (e.g., "candidate-1"), but the blockchain contract expects numeric IDs (e.g., 1). The application automatically converts these formats, but keep this in mind when debugging.

## Troubleshooting

If MetaMask is not opening when voting:

1. Check that MetaMask is installed and logged in
2. Refresh the page and try again
3. Check the console for error messages
4. Ensure your browser allows popups from the application
5. Try a different browser if issues persist

For more detailed setup instructions and advanced blockchain integration options, please refer to the main README file.
