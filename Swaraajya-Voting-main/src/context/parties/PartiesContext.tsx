import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  fetchParties, addPartyToDb, updatePartyInDb, deletePartyFromDb
} from '@/services/databaseService';
import { Party } from '@/types/votingTypes';
import { mapDbPartyToClient, mapClientPartyToDb } from '@/utils/entityMappers';
import { showToast } from '@/utils/toastUtils';

export interface PartiesContextType {
  parties: Party[];
  addParty: (party: Omit<Party, 'id'>) => Promise<void>;
  updateParty: (party: Party) => Promise<void>;
  deleteParty: (id: string) => Promise<void>;
  getPartyById: (id: string) => Party | undefined;
  refreshParties: () => Promise<void>;
}

export const PartiesContext = createContext<PartiesContextType | undefined>(undefined);

export const PartiesProvider = ({ children }: { children: ReactNode }) => {
  const [parties, setParties] = useState<Party[]>([]);

  const refreshParties = async () => {
    try {
      const partiesData = await fetchParties();
      setParties(partiesData.map(mapDbPartyToClient));
    } catch (error) {
      console.error('Error loading parties:', error);
      throw error;
    }
  };

  const addParty = async (party: Omit<Party, 'id'>) => {
    try {
      const newDbParty = await addPartyToDb(mapClientPartyToDb(party));
      const newParty = mapDbPartyToClient(newDbParty);
      setParties(prev => [...prev, newParty]);
    } catch (error) {
      console.error('Error adding party:', error);
      showToast.error('Failed to add party', 'Database operation failed');
      throw error;
    }
  };

  const updateParty = async (party: Party) => {
    try {
      const updatedDbParty = await updatePartyInDb({
        id: party.id,
        name: party.name,
        symbol: party.symbol
      });
      const updatedParty = mapDbPartyToClient(updatedDbParty);
      setParties(prev => prev.map(p => p.id === updatedParty.id ? updatedParty : p));
    } catch (error) {
      console.error('Error updating party:', error);
      showToast.error('Failed to update party', 'Database operation failed');
      throw error;
    }
  };

  const deleteParty = async (id: string) => {
    try {
      await deletePartyFromDb(id);
      setParties(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting party:', error);
      showToast.error('Failed to delete party', 'Database operation failed');
      throw error;
    }
  };

  const getPartyById = (id: string) => {
    return parties.find(party => party.id === id);
  };

  const value: PartiesContextType = {
    parties,
    addParty,
    updateParty,
    deleteParty,
    getPartyById,
    refreshParties
  };

  return (
    <PartiesContext.Provider value={value}>
      {children}
    </PartiesContext.Provider>
  );
};

export const useParties = (): PartiesContextType => {
  const context = useContext(PartiesContext);
  if (context === undefined) {
    throw new Error('useParties must be used within a PartiesProvider');
  }
  return context;
};
