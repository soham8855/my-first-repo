
import { useContext } from 'react';
import { VotingContext, VotingContextType } from './VotingContext';

export const useVoting = (): VotingContextType => {
  const context = useContext(VotingContext);
  if (context === undefined) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};
