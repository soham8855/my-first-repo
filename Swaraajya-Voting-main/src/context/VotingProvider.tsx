
import { useState, useEffect, ReactNode } from 'react';
import { PartiesProvider, useParties } from './parties/PartiesContext';
import { CandidatesProvider, useCandidates } from './candidates/CandidatesContext';
import { VotersProvider, useVoters } from './voters/VotersContext';
import { VotesProvider, useVotes } from './votes/VotesContext';
import { VotingContext, VotingContextType } from './VotingContext';
import { showToast } from '@/utils/toastUtils';

export const VotingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  // Create a combined provider that wraps all individual context providers
  return (
    <PartiesProvider>
      <CandidatesProvider>
        <VotersProvider>
          <VotesProviderWithContext>
            <CombinedVotingProvider setLoading={setLoading}>
              {children}
            </CombinedVotingProvider>
          </VotesProviderWithContext>
        </VotersProvider>
      </CandidatesProvider>
    </PartiesProvider>
  );
};

// Wrapper component to provide voter update callback to VotesProvider
const VotesProviderWithContext = ({ children }: { children: ReactNode }) => {
  const { voters, updateVoter, refreshVoters } = useVoters();
  
  const handleVoteCast = async (voterId: string) => {
    console.log(`Handling vote cast for voter ID: ${voterId}`);
    
    // Find the voter and update their status
    const voter = voters.find(v => v.id === voterId);
    if (voter) {
      try {
        console.log(`Updating voter ${voterId} hasVoted status to true`);
        await updateVoter({ ...voter, hasVoted: true });
        
        // Refresh voters list to ensure UI is updated
        await refreshVoters();
        console.log(`Updated voter ${voterId} hasVoted status to true and refreshed voters`);
      } catch (error) {
        console.error(`Error updating voter status for ${voterId}:`, error);
        showToast.error('Failed to update voter status', 'Database operation failed');
      }
    } else {
      console.warn(`Voter with ID ${voterId} not found when trying to update voting status`);
    }
  };

  return (
    <VotesProvider onVoteCast={handleVoteCast}>
      {children}
    </VotesProvider>
  );
};

// Component that combines all context values into the main VotingContext
const CombinedVotingProvider = ({ 
  children, 
  setLoading 
}: { 
  children: ReactNode, 
  setLoading: (loading: boolean) => void 
}) => {
  const parties = useParties();
  const candidates = useCandidates();
  const voters = useVoters();
  const votes = useVotes();
  
  // Local loading state for this component
  const [isLoading, setIsLoading] = useState(true);
  
  // Election status
  const [isElectionStarted, setIsElectionStarted] = useState(false);

  // Function to refresh all data from all contexts
  const refreshData = async () => {
    setLoading(true);
    setIsLoading(true);
    try {
      await Promise.all([
        parties.refreshParties(),
        candidates.refreshCandidates(),
        voters.refreshVoters(),
        votes.refreshVotes()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast.error('Failed to load data from database', 'Please make sure you have set up Supabase correctly');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  // Load data when the component mounts
  useEffect(() => {
    refreshData();
    
    // Check for election status in localStorage
    const savedElectionStatus = localStorage.getItem('isElectionStarted');
    if (savedElectionStatus) {
      setIsElectionStarted(savedElectionStatus === 'true');
    }
  }, []);
  
  // Election control functions
  const startElection = () => {
    setIsElectionStarted(true);
    localStorage.setItem('isElectionStarted', 'true');
    showToast.success('Election Started', 'Voters can now cast their votes');
  };
  
  const stopElection = () => {
    setIsElectionStarted(false);
    localStorage.setItem('isElectionStarted', 'false');
    showToast.success('Election Stopped', 'Voting has been closed');
  };

  // Create a combined value object
  const getVotesByParty = () => {
    return votes.getVotesByParty(candidates.candidates, parties.parties);
  };

  const combinedValue: VotingContextType = {
    // From parties context
    parties: parties.parties,
    addParty: parties.addParty,
    updateParty: parties.updateParty,
    deleteParty: parties.deleteParty,
    getPartyById: parties.getPartyById,
    
    // From candidates context
    candidates: candidates.candidates,
    addCandidate: candidates.addCandidate,
    updateCandidate: candidates.updateCandidate,
    deleteCandidate: candidates.deleteCandidate,
    getCandidateById: candidates.getCandidateById,
    
    // From voters context
    voters: voters.voters,
    addVoter: voters.addVoter,
    updateVoter: voters.updateVoter,
    deleteVoter: voters.deleteVoter,
    getVoterById: voters.getVoterById,
    
    // From votes context
    votes: votes.votes,
    castVote: votes.castVote,
    
    // Election controls
    isElectionStarted,
    startElection,
    stopElection,
    
    // Combined methods
    getVotesByParty,
    
    // Loading state and refresh
    loading: isLoading,
    refreshData
  };

  return (
    <VotingContext.Provider value={combinedValue}>
      {children}
    </VotingContext.Provider>
  );
};
