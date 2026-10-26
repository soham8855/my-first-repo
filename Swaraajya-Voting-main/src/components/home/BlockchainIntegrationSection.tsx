
import { Shield, Database, Repeat, Vote, Landmark, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BlockchainIntegrationSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Secure Digital Voting with Blockchain</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            BlockVote leverages blockchain technology to provide a secure, transparent, and immutable voting platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Vote className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Digital Voting</h3>
            <p className="text-muted-foreground">Convenient and accessible voting from anywhere at any time.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Blockchain Security</h3>
            <p className="text-muted-foreground">Votes are stored on the blockchain, making them tamper-proof and verifiable.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Landmark className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ethereum Integration</h3>
            <p className="text-muted-foreground">Built on Ethereum smart contracts for transparent and decentralized voting.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">MetaMask Support</h3>
            <p className="text-muted-foreground">Connect with MetaMask wallet for secure blockchain interactions.</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4">How Blockchain Voting Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-3">1</div>
              <h4 className="font-medium mb-2">Connect Your Wallet</h4>
              <p className="text-sm text-muted-foreground">Connect your MetaMask wallet to authenticate and interact with the blockchain.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-3">2</div>
              <h4 className="font-medium mb-2">Cast Your Vote</h4>
              <p className="text-sm text-muted-foreground">Select a candidate and submit your vote as a blockchain transaction.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-3">3</div>
              <h4 className="font-medium mb-2">Verify Your Vote</h4>
              <p className="text-sm text-muted-foreground">Each vote creates an immutable transaction that can be verified on the blockchain.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/cast-vote">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              Start Voting Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlockchainIntegrationSection;
