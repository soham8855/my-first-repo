
import { Party as DbParty, Candidate as DbCandidate, Voter as DbVoter, Vote as DbVote } from '@/lib/supabase';
import { Party, Candidate, Voter, Vote } from '@/types/votingTypes';

// Helper functions to map between DB and client models
export const mapDbPartyToClient = (dbParty: DbParty): Party => ({
  id: dbParty.id,
  name: dbParty.name,
  symbol: dbParty.symbol
});

export const mapClientPartyToDb = (party: Omit<Party, 'id'>): Omit<DbParty, 'id'> => ({
  name: party.name,
  symbol: party.symbol
});

export const mapDbCandidateToClient = (dbCandidate: DbCandidate): Candidate => ({
  id: dbCandidate.id,
  name: dbCandidate.name,
  partyId: dbCandidate.party_id,
  imageUrl: dbCandidate.image_url
});

export const mapClientCandidateToDb = (candidate: Omit<Candidate, 'id'>): Omit<DbCandidate, 'id'> => ({
  name: candidate.name,
  party_id: candidate.partyId,
  image_url: candidate.imageUrl
});

export const mapDbVoterToClient = (dbVoter: DbVoter): Voter => ({
  id: dbVoter.id,
  name: dbVoter.name,
  email: dbVoter.email,
  aadhaarNumber: dbVoter.aadhaar_number,
  hasVoted: dbVoter.has_voted
});

export const mapClientVoterToDb = (voter: Omit<Voter, 'id' | 'hasVoted'>): Omit<DbVoter, 'id' | 'has_voted'> => ({
  name: voter.name,
  email: voter.email,
  aadhaar_number: voter.aadhaarNumber
});

export const mapDbVoteToClient = (dbVote: DbVote): Vote => ({
  id: dbVote.id,
  voterId: dbVote.voter_id,
  candidateId: dbVote.candidate_id,
  timestamp: dbVote.timestamp
});
