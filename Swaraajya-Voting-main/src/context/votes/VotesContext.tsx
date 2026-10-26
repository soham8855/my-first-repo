
import { createContext, useContext, useState, ReactNode } from 'react';
import { castVoteInDb, fetchVotes } from '@/services/voteService';
import { Vote } from '@/types/votingTypes';
import { mapDbVoteToClient } from '@/utils/entityMappers';
import { showToast } from '@/utils/toastUtils';
import blockchainService from '@/services/blockchainService';

export interface VotesContextType {
  votes: Vote[];
  castVote: (voterId: string, candidateId: string) => Promise<void>;
  refreshVotes: () => Promise<void>;
  getVotesByParty: (candidates: Array<{id: string, partyId: string}>, parties: Array<{id: string}>) => Record<string, number>;
}

export const VotesContext = createContext<VotesContextType | undefined>(undefined);

export const VotesProvider = ({ children, onVoteCast }: { children: ReactNode, onVoteCast?: (voterId: string) => void }) => {
  const [votes, setVotes] = useState<Vote[]>([]);

  const refreshVotes = async () => {
    try {
      const votesData = await fetchVotes();
      setVotes(votesData.map(mapDbVoteToClient));
    } catch (error) {
      console.error('Error loading votes:', error);
      throw error;
    }
  };

  const castVote = async (voterId: string, candidateId: string) => {
    try {
      console.log(`Casting vote by ${voterId} for candidate ${candidateId}`);
      
      // Generate a simple hash for vote transaction ID
      const hash = Math.random().toString(36).substring(2, 15);
      
      // Try to cast vote on blockchain first if service is initialized
      let blockchainTxHash = null;
      if (blockchainService.isInitialized()) {
        try {
          console.log("Attempting to cast vote on blockchain...");
          blockchainTxHash = await blockchainService.castVote(candidateId);
          console.log("Blockchain vote cast successful with hash:", blockchainTxHash);
        } catch (blockchainError) {
          console.error("Blockchain voting failed:", blockchainError);
          // We continue with database storage even if blockchain fails
          showToast.warning(
            'Blockchain transaction failed', 
            'Vote will be recorded in database only'
          );
        }
      } else {
        console.log("Blockchain service not initialized, skipping blockchain vote");
      }
      
      // Store vote in database
      const newDbVote = await castVoteInDb(voterId, candidateId, hash, blockchainTxHash);
      const newVote = mapDbVoteToClient(newDbVote);
      
      setVotes(prev => [...prev, newVote]);
      
      if (onVoteCast) {
        console.log(`Calling onVoteCast callback for voter ${voterId}`);
        await onVoteCast(voterId);
      }
      
      showToast.success(
        'Vote cast successfully', 
        blockchainTxHash ? 'Your vote has been recorded on blockchain and in database' : 'Your vote has been recorded in database'
      );
      
    } catch (error) {
      console.error('Error casting vote:', error);
      showToast.error('Failed to cast vote', 'Please try again');
      throw error;
    }
  };

  const getVotesByParty = (candidates: Array<{id: string, partyId: string}>, parties: Array<{id: string}>) => {
    const votesByParty: Record<string, number> = {};
    
    parties.forEach(party => {
      votesByParty[party.id] = 0;
    });
    
    votes.forEach(vote => {
      const candidate = candidates.find(c => c.id === vote.candidateId);
      if (candidate) {
        votesByParty[candidate.partyId] = (votesByParty[candidate.partyId] || 0) + 1;
      }
    });
    
    return votesByParty;
  };

  const value: VotesContextType = {
    votes,
    castVote,
    refreshVotes,
    getVotesByParty
  };

  return (
    <VotesContext.Provider value={value}>
      {children}
    </VotesContext.Provider>
  );
};

export const useVotes = (): VotesContextType => {
  const context = useContext(VotesContext);
  if (context === undefined) {
    throw new Error('useVotes must be used within a VotesProvider');
  }
  return context;
};
