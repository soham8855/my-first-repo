
import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  fetchCandidates, addCandidateToDb, updateCandidateInDb, deleteCandidateFromDb
} from '@/services/databaseService';
import { Candidate } from '@/types/votingTypes';
import { mapDbCandidateToClient, mapClientCandidateToDb } from '@/utils/entityMappers';
import { showToast } from '@/utils/toastUtils';

export interface CandidatesContextType {
  candidates: Candidate[];
  addCandidate: (candidate: Omit<Candidate, 'id'>) => Promise<void>;
  updateCandidate: (candidate: Candidate) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
  getCandidateById: (id: string) => Candidate | undefined;
  refreshCandidates: () => Promise<void>;
}

export const CandidatesContext = createContext<CandidatesContextType | undefined>(undefined);

export const CandidatesProvider = ({ children }: { children: ReactNode }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const refreshCandidates = async () => {
    try {
      const candidatesData = await fetchCandidates();
      setCandidates(candidatesData.map(mapDbCandidateToClient));
      // Return void instead of candidatesData to match interface
    } catch (error) {
      console.error('Error loading candidates:', error);
      throw error;
    }
  };

  // Candidate operations
  const addCandidate = async (candidate: Omit<Candidate, 'id'>) => {
    try {
      const newDbCandidate = await addCandidateToDb(mapClientCandidateToDb(candidate));
      const newCandidate = mapDbCandidateToClient(newDbCandidate);
      setCandidates(prev => [...prev, newCandidate]);
    } catch (error) {
      console.error('Error adding candidate:', error);
      showToast.error('Failed to add candidate', 'Database operation failed');
      throw error;
    }
  };

  const updateCandidate = async (candidate: Candidate) => {
    try {
      const updatedDbCandidate = await updateCandidateInDb({
        id: candidate.id,
        name: candidate.name,
        party_id: candidate.partyId,
        image_url: candidate.imageUrl
      });
      const updatedCandidate = mapDbCandidateToClient(updatedDbCandidate);
      setCandidates(prev => prev.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
    } catch (error) {
      console.error('Error updating candidate:', error);
      showToast.error('Failed to update candidate', 'Database operation failed');
      throw error;
    }
  };

  const deleteCandidate = async (id: string) => {
    try {
      await deleteCandidateFromDb(id);
      setCandidates(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting candidate:', error);
      showToast.error('Failed to delete candidate', 'Database operation failed');
      throw error;
    }
  };

  // Helper methods
  const getCandidateById = (id: string) => {
    return candidates.find(candidate => candidate.id === id);
  };

  const value: CandidatesContextType = {
    candidates,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateById,
    refreshCandidates
  };

  return (
    <CandidatesContext.Provider value={value}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = (): CandidatesContextType => {
  const context = useContext(CandidatesContext);
  if (context === undefined) {
    throw new Error('useCandidates must be used within a CandidatesProvider');
  }
  return context;
};
