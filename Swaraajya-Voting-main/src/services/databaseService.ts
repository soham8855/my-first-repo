
// This file now serves as a central export point for all database services
import { fetchParties, addPartyToDb, updatePartyInDb, deletePartyFromDb } from './partyService';
import { fetchCandidates, addCandidateToDb, updateCandidateInDb, deleteCandidateFromDb } from './candidateService';
import { fetchVoters, addVoterToDb, updateVoterInDb, deleteVoterFromDb } from './voterService';
import { castVoteInDb, fetchVotes } from './voteService';

// Re-export all service functions
export {
  // Party services
  fetchParties,
  addPartyToDb,
  updatePartyInDb,
  deletePartyFromDb,
  
  // Candidate services
  fetchCandidates,
  addCandidateToDb,
  updateCandidateInDb,
  deleteCandidateFromDb,
  
  // Voter services
  fetchVoters,
  addVoterToDb,
  updateVoterInDb,
  deleteVoterFromDb,
  
  // Vote services
  castVoteInDb,
  fetchVotes
};
