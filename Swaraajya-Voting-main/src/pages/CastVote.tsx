
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useVoting } from '@/context/useVoting';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

const CastVote = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { 
    candidates, 
    parties, 
    voters, 
    castVote, 
    getPartyById,
    isElectionStarted
  } = useVoting();
  
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, you would get the current voter from authentication
  const currentVoter = voters.find(v => v.id === "voter-01");
  
  // Check if the user has already voted or if election hasn't started
  useEffect(() => {
    if (!isElectionStarted) {
      toast.error(t("election_not_active"), {
        description: t("wait_for_admin"),
      });
      navigate('/voter-dashboard');
    }
    else if (currentVoter && currentVoter.hasVoted) {
      toast.error(t("already_voted"), {
        description: t("each_voter_once"),
      });
      navigate('/voter-dashboard');
    }
  }, [currentVoter, navigate, isElectionStarted, t]);
  
  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidate(candidateId);
  };
  
  const handleVote = async () => {
    if (!selectedCandidate || !currentVoter) return;
    
    setIsSubmitting(true);
    try {
      console.log(`Casting vote: voter=${currentVoter.id}, candidate=${selectedCandidate}`);
      await castVote(currentVoter.id, selectedCandidate);
      
      setIsSubmitting(false);
      toast.success(t('vote_cast_success'));
      
      // Navigate to dashboard after successful vote
      setTimeout(() => {
        navigate('/voter-dashboard');
      }, 1500);
      
    } catch (error: any) {
      console.error('Error casting vote:', error);
      toast.error(t('vote_processing'), {
        description: error.message || t('wait_for_admin'),
      });
      setIsSubmitting(false);
    }
  };
  
  // Group candidates by party for better organization
  const candidatesByParty: Record<string, typeof candidates> = {};
  candidates.forEach(candidate => {
    if (!candidatesByParty[candidate.partyId]) {
      candidatesByParty[candidate.partyId] = [];
    }
    candidatesByParty[candidate.partyId].push(candidate);
  });
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={false} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAdmin={false} />
        
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">{t('cast_vote')}</h1>
              <p className="text-muted-foreground mt-2">
                {t('select_candidate')}
              </p>
            </div>
            
            {/* Candidates by Party */}
            {Object.keys(candidatesByParty).map(partyId => {
              const party = getPartyById(partyId);
              if (!party) return null;
              
              return (
                <div key={partyId} className="mb-10">
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                      style={{ backgroundColor: hashStringToColor(party.name) }}
                    >
                      <span className="text-white text-sm font-bold">
                        {party.name.substring(0, 1)}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold">{party.name}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidatesByParty[partyId].map(candidate => (
                      <div 
                        key={candidate.id}
                        className={`
                          border rounded-lg p-4 cursor-pointer transition-all
                          ${selectedCandidate === candidate.id 
                            ? 'border-primary ring-2 ring-primary/30 bg-primary/5' 
                            : 'hover:border-primary/50 hover:bg-background'}
                        `}
                        onClick={() => handleCandidateSelect(candidate.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{party.name}</p>
                          </div>
                          {candidate.imageUrl && (
                            <div className="w-16 h-16 rounded-full overflow-hidden border">
                              <img 
                                src={candidate.imageUrl} 
                                alt={candidate.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                        
                        {selectedCandidate === candidate.id && (
                          <div className="mt-4 pt-4 border-t flex items-center text-primary">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">{t('selected')}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {/* Bottom action bar */}
            <div className="sticky bottom-0 bg-background border-t p-4 flex justify-end">
              <Button
                disabled={!selectedCandidate || isSubmitting}
                onClick={handleVote}
                className="px-8"
              >
                {isSubmitting ? t('casting_vote') : t('cast_vote')}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper function to generate consistent colors for parties
const hashStringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
    '#1abc9c', '#d35400', '#34495e', '#7f8c8d', '#27ae60'
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

export default CastVote;
