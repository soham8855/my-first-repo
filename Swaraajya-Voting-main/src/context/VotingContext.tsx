
import { createContext } from 'react';
import { Party, Candidate, Voter, Vote } from '@/types/votingTypes';
import { VotingProvider } from './VotingProvider';
import { useVoting } from './useVoting';

export interface VotingContextType {
  parties: Party[];
  candidates: Candidate[];
  voters: Voter[];
  votes: Vote[];
  loading: boolean;
  isElectionStarted: boolean;
  startElection: () => void;
  stopElection: () => void;
  addParty: (party: Omit<Party, 'id'>) => Promise<void>;
  updateParty: (party: Party) => Promise<void>;
  deleteParty: (id: string) => Promise<void>;
  addCandidate: (candidate: Omit<Candidate, 'id'>) => Promise<void>;
  updateCandidate: (candidate: Candidate) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
  addVoter: (voter: Omit<Voter, 'id' | 'hasVoted'>) => Promise<void>;
  updateVoter: (voter: Voter) => Promise<void>;
  deleteVoter: (id: string) => Promise<void>;
  castVote: (voterId: string, candidateId: string) => Promise<void>;
  getPartyById: (id: string) => Party | undefined;
  getCandidateById: (id: string) => Candidate | undefined;
  getVoterById: (id: string) => Voter | undefined;
  getVotesByParty: () => Record<string, number>;
  refreshData: () => Promise<void>;
}

export const VotingContext = createContext<VotingContextType | undefined>(undefined);

export { VotingProvider, useVoting };
