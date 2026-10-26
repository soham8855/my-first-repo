
# Supabase Database Setup (Free)

This guide explains how to set up a free Supabase database for BlockVote.

## Important: Two Data Storage Options

BlockVote now provides two ways to store data:

1. **Browser Storage (No setup required)**
   - Data is stored in your browser's localStorage
   - Data persists through page refreshes
   - No need to set up Supabase or configure environment variables
   - Limitations: Data is device-specific and lost if browser data is cleared

2. **Supabase Cloud Database (Recommended)**
   - Data is stored securely in the cloud
   - Data persists across all devices and browsers
   - Requires the setup steps below
   - Provides enterprise-grade reliability and security

## Step 1: Create a Supabase Account

- Go to [Supabase](https://supabase.io/) and sign up for a free account
- Choose the free tier when creating your account

## Step 2: Create a New Project

- Click "New Project" in the Supabase dashboard
- Enter a name for your project (e.g., "BlockVote")
- Set a secure password for the database
- Select the region closest to you
- Click "Create New Project"

## Step 3: Get Your API Keys

- In your project dashboard, go to Settings > API
- Note down your:
  - Project URL (starts with https://)
  - anon/public key

## Step 4: Set Up Environment Variables

Create a `.env` file in the root of your BlockVote project with:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**IMPORTANT:** 
- Replace `your_supabase_project_url` with the actual URL from your Supabase dashboard (looks like: https://abcdefghijklm.supabase.co)
- Replace `your_supabase_anon_key` with the actual anon key from your Supabase dashboard (a long string of characters)
- After creating the .env file, restart your development server for the changes to take effect
- If you don't set these values, the app will fall back to browser localStorage, which is less reliable but still persists data between refreshes

## Step 5: Create Database Tables

Go to the SQL Editor in your Supabase dashboard and run the following SQL commands:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  aadhaar_number TEXT UNIQUE NOT NULL,
  has_voted BOOLEAN NOT NULL DEFAULT false,
  role TEXT NOT NULL DEFAULT 'voter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);
```

### Parties Table
```sql
CREATE TABLE parties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Candidates Table
```sql
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  party_id UUID REFERENCES parties(id),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Votes Table
```sql
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voter_id UUID REFERENCES users(id),
  candidate_id UUID REFERENCES candidates(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  hash TEXT NOT NULL,
  blockchain_tx_hash TEXT  -- To store blockchain transaction hash
);
```

## Step 6: Enable Row Level Security (RLS)

For better security, enable Row Level Security on all tables and create appropriate policies:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies (simplified for demo - adjust according to your security needs)
CREATE POLICY "Public read access to parties" ON parties FOR SELECT USING (true);
CREATE POLICY "Public read access to candidates" ON candidates FOR SELECT USING (true);
CREATE POLICY "Public insert to parties" ON parties FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update to parties" ON parties FOR UPDATE USING (true);
CREATE POLICY "Public delete from parties" ON parties FOR DELETE USING (true);
CREATE POLICY "Public insert to candidates" ON candidates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update to candidates" ON candidates FOR UPDATE USING (true);
CREATE POLICY "Public delete from candidates" ON candidates FOR DELETE USING (true);
CREATE POLICY "Public read access to users" ON users FOR SELECT USING (true);
CREATE POLICY "Public insert to users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update to users" ON users FOR UPDATE USING (true);
CREATE POLICY "Public delete from users" ON users FOR DELETE USING (true);
CREATE POLICY "Public read access to votes" ON votes FOR SELECT USING (true);
CREATE POLICY "Public insert to votes" ON votes FOR INSERT WITH CHECK (true);
```

## Step 7: Verify Your Setup

After setting up the tables and policies, refresh your application and check the browser console to ensure:

1. The Supabase client is initialized correctly - you should see a log message "Supabase client initialized with URL:" followed by your actual URL, not "MOCK DATABASE"
2. Data is being fetched from the database without errors
3. If you see "Supabase client initialized with URL: MOCK DATABASE (localStorage)" in the console, it means your environment variables are not set, but data will still persist in browser storage

## Step 8: Troubleshooting

If you encounter connection errors:

- Double-check that your `.env` file is in the root directory of your project
- Make sure the variable names are exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Ensure there are no trailing spaces or extra characters in your URL or anon key
- Make sure your Supabase project is active and not in maintenance mode
- Verify that your tables are created correctly with the proper column names
- Check that RLS policies are correctly set up for each table
- Inspect the browser's developer console for specific error messages

For "Failed to fetch" errors:

- This usually means your Supabase URL or anon key is incorrect
- Check that your Supabase URL starts with https:// and is the correct URL for your project
- Verify your anon key is copied correctly from the Supabase dashboard
- Ensure your Supabase instance is active and running
- Check if your network allows connections to the Supabase server

## Step 9: Add Sample Data

For testing, you may want to add some sample data directly through the Supabase dashboard:

1. Go to the Table Editor in your Supabase dashboard
2. Select a table (e.g., "parties")
3. Click "Insert Row" and add sample data
4. Repeat for other tables as needed

Your Supabase database is now set up and should be working with your BlockVote application!
