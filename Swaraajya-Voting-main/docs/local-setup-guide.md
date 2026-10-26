
# Local Setup Guide for BlockVote

This guide will walk you through setting up BlockVote to run on your local machine with database support.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) (v7 or newer)
- [Git](https://git-scm.com/) (for cloning the repository)
- [Ganache](https://trufflesuite.com/ganache/) (for local blockchain)
- [MetaMask](https://metamask.io/) browser extension

## Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to the project directory
cd blockvote

# Install dependencies
npm install
```

## Step 2: Database Setup Options

BlockVote offers two database options:

### Option A: Browser Storage (Simplest for Local Testing)

- No additional setup required
- Data persists in browser localStorage
- Good for local development and testing
- Limited to one browser/device

### Option B: Supabase Database (Recommended for Multi-Device Use)

1. Create a free [Supabase](https://supabase.com/) account
2. Create a new Supabase project
3. Set up database tables as outlined in [docs/supabase-setup.md](./supabase-setup.md)
4. Create a `.env` file in the project root with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Configure Blockchain (For Full Functionality)

1. Start Ganache to run a local blockchain
2. Configure MetaMask to connect to your Ganache blockchain:
   - Network Name: Ganache
   - RPC URL: http://127.0.0.1:7545 (default Ganache URL)
   - Chain ID: 1337
   - Currency Symbol: ETH

3. Update the contract address in `src/services/blockchainService.ts` if needed

## Step 4: Start the Development Server

```bash
npm run dev
```

Your application should now be running at [http://localhost:5173](http://localhost:5173)

## Verification Steps

1. Open the browser console and check for:
   - "Supabase client initialized with URL: your_supabase_url" (if using Supabase)
   - "Supabase client initialized with URL: MOCK DATABASE (localStorage)" (if using browser storage)

2. Try adding a party, candidate and voter through the admin panel
3. Attempt to cast a vote using the voter login

## Troubleshooting

- **Data not persisting**: If using Supabase, verify your environment variables are set correctly. If using localStorage, check that your browser doesn't clear site data automatically.

- **Blockchain connection issues**: Ensure Ganache is running and MetaMask is configured to connect to your local blockchain network.

- **Server not starting**: Check for any error messages in the terminal. Make sure all dependencies are installed with `npm install`.
