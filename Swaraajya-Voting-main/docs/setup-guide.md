
# Step-by-Step Setup Guide

This guide will walk you through setting up BlockVote on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) (v7 or newer)
- Git
- [Ganache](https://trufflesuite.com/ganache/) (for local blockchain)
- [MetaMask](https://metamask.io/) browser extension
- A free Supabase account (for the database)

## Installation Steps

### 1. Clone the Repository

```sh
# Clone the repository using the project's Git URL
git clone https://github.com/yourusername/blockvote.git

# Navigate to the project directory
cd blockvote
```

### 2. Install Dependencies

```sh
# Install the necessary dependencies
npm install
```

### 3. Set Up Environment Variables (REQUIRED for permanent data storage)

Create a `.env` file in the root of your project:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ **DATA PERSISTENCE OPTIONS** ⚠️

BlockVote provides two ways to store data:

1. **Without Supabase setup (Basic option)**
   - Data is stored in your browser's localStorage
   - Data persists through page refreshes (but is lost if you clear browser data)
   - Each device/browser has its own separate database
   - Useful for quick demos or development

2. **With Supabase setup (Recommended for production)**
   - Data is stored in a cloud database
   - Data persists across all devices and browsers
   - Data is securely backed up
   - Required for professional or production use

For Supabase setup:
1. Create a free Supabase account
2. Set up your database tables as described in [supabase-setup.md](./supabase-setup.md)
3. Copy your Supabase URL and anon key to the `.env` file
4. Restart your development server

### 4. Start the Development Server

```sh
npm run dev
```

Your app should now be running at http://localhost:5173/

## Data Storage Modes Explained

BlockVote now operates in two modes:

1. **Browser Storage Mode (Default without Supabase)**
   - Uses browser localStorage to persist data between refreshes
   - All data (voters, parties, candidates, votes) remains after page reloads
   - Data is stored per-browser (not synchronized across devices)
   - Data is lost if browser cache/localStorage is cleared

2. **Cloud Database Mode (With Supabase)**
   - Uses Supabase cloud database for enterprise-grade persistence
   - All data is preserved across all devices and browsers
   - Provides backup and recovery options
   - Required for any production or multi-user usage

## Additional Setup

For complete functionality with cloud database storage, you'll need to set up:

1. [Supabase Database](./supabase-setup.md) - For multi-device, secure data storage
2. [Blockchain with Ganache](./blockchain-setup.md) - For vote verification

## Deployment

For deployment with permanent data storage, you can use services like:
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)

Simply connect your repository to these services and they will automatically build and deploy your application.

**Important:** When deploying, make sure to configure your environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in your deployment platform's settings.
