
import { Link } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useVoting } from '@/context/useVoting';
import VoteIcon from '@/components/icons/VoteIcon';

const HeroSection = () => {
  const { candidates, votes } = useVoting();
  
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Traditional pattern background */}
      <div className="absolute inset-0 z-0 opacity-20 jali-pattern"></div>
      
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row md:items-center relative z-10">
        <div className="w-full md:w-1/2 space-y-6 pt-10 md:pt-0">
          <div className="inline-block indian-border p-2 mb-4">
            <span className="text-amber-700">Secure • Transparent • Democratic</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Modern Voting with<br />
            <span className="text-amber-600 diya-glow">Traditional Values</span>
          </h1>
          
          <p className="text-amber-800 max-w-xl text-lg">
            Vote securely and transparently with our blockchain-based platform inspired by India's democratic principles and cultural heritage.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <Link to="/admin-login">
              <Button variant="default" size="lg" className="w-full sm:w-auto flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
                <UserIcon className="h-4 w-4" />
                Admin Login
              </Button>
            </Link>
            <Link to="/voter-login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center gap-2 border-amber-500 text-amber-800 hover:bg-amber-100">
                <VoteIcon className="h-4 w-4" />
                Voter Login
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="glass-effect rounded-xl p-6 w-full max-w-md">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-amber-800">Current Statistics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-amber-50/60 p-4 rounded-lg flex flex-col items-center justify-center border-amber-200">
                <div className="text-amber-600 p-2 rounded-full bg-amber-100 mb-4">
                  <UserIcon className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold text-center text-amber-800">{candidates.length}</h3>
                <p className="text-sm text-amber-700 text-center">Candidates</p>
              </Card>
              
              <Card className="bg-amber-50/60 p-4 rounded-lg flex flex-col items-center justify-center border-amber-200">
                <div className="text-amber-600 p-2 rounded-full bg-amber-100 mb-4">
                  <VoteIcon className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold text-center text-amber-800">{votes.length}</h3>
                <p className="text-sm text-amber-700 text-center">Votes Cast</p>
              </Card>
            </div>
            
            <div className="mt-6 pt-4 border-t border-dashed border-amber-200 text-center text-amber-700">
              <p>Join the electronic voting revolution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
