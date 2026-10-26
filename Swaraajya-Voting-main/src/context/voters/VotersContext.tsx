
import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  fetchVoters, addVoterToDb, updateVoterInDb, deleteVoterFromDb
} from '@/services/databaseService';
import { Voter } from '@/types/votingTypes';
import { mapDbVoterToClient, mapClientVoterToDb } from '@/utils/entityMappers';
import { showToast } from '@/utils/toastUtils';

export interface VotersContextType {
  voters: Voter[];
  addVoter: (voter: Omit<Voter, 'id' | 'hasVoted'>) => Promise<void>;
  updateVoter: (voter: Voter) => Promise<void>;
  deleteVoter: (id: string) => Promise<void>;
  getVoterById: (id: string) => Voter | undefined;
  refreshVoters: () => Promise<void>;
}

export const VotersContext = createContext<VotersContextType | undefined>(undefined);

export const VotersProvider = ({ children }: { children: ReactNode }) => {
  const [voters, setVoters] = useState<Voter[]>([]);

  const refreshVoters = async () => {
    try {
      const votersData = await fetchVoters();
      setVoters(votersData.map(mapDbVoterToClient));
      // Return void instead of votersData to match interface
    } catch (error) {
      console.error('Error loading voters:', error);
      throw error;
    }
  };

  // Voter operations
  const addVoter = async (voter: Omit<Voter, 'id' | 'hasVoted'>) => {
    try {
      const newDbVoter = await addVoterToDb(mapClientVoterToDb(voter));
      const newVoter = mapDbVoterToClient(newDbVoter);
      setVoters(prev => [...prev, newVoter]);
    } catch (error) {
      console.error('Error adding voter:', error);
      showToast.error('Failed to add voter', 'Database operation failed');
      throw error;
    }
  };

  const updateVoter = async (voter: Voter) => {
    try {
      const updatedDbVoter = await updateVoterInDb({
        id: voter.id,
        name: voter.name,
        email: voter.email,
        aadhaar_number: voter.aadhaarNumber,
        has_voted: voter.hasVoted
      });
      const updatedVoter = mapDbVoterToClient(updatedDbVoter);
      setVoters(prev => prev.map(v => v.id === updatedVoter.id ? updatedVoter : v));
    } catch (error) {
      console.error('Error updating voter:', error);
      showToast.error('Failed to update voter', 'Database operation failed');
      throw error;
    }
  };

  const deleteVoter = async (id: string) => {
    try {
      await deleteVoterFromDb(id);
      setVoters(prev => prev.filter(v => v.id !== id));
    } catch (error) {
      console.error('Error deleting voter:', error);
      showToast.error('Failed to delete voter', 'Database operation failed');
      throw error;
    }
  };

  // Helper methods
  const getVoterById = (id: string) => {
    return voters.find(voter => voter.id === id);
  };

  const value: VotersContextType = {
    voters,
    addVoter,
    updateVoter,
    deleteVoter,
    getVoterById,
    refreshVoters
  };

  return (
    <VotersContext.Provider value={value}>
      {children}
    </VotersContext.Provider>
  );
};

export const useVoters = (): VotersContextType => {
  const context = useContext(VotersContext);
  if (context === undefined) {
    throw new Error('useVoters must be used within a VotersProvider');
  }
  return context;
};
