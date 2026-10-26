
import { supabase, Party } from '@/lib/supabase';
import { showToast } from '@/utils/toastUtils';

export const fetchParties = async (): Promise<Party[]> => {
  console.log('Fetching parties...');
  try {
    const { data, error } = await supabase
      .from('parties')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching parties:', error);
      throw error;
    }

    console.log('Fetched parties:', data);
    return data || [];
  } catch (error) {
    console.error('Exception fetching parties:', error);
    throw error;
  }
};

export const addPartyToDb = async (party: Omit<Party, 'id'>): Promise<Party> => {
  console.log('Adding party to DB:', party);
  try {
    const { data, error } = await supabase
      .from('parties')
      .insert([party])
      .select()
      .single();

    if (error) {
      console.error('Error adding party:', error);
      throw error;
    }

    console.log('Added party successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception adding party:', error);
    throw error;
  }
};

export const updatePartyInDb = async (party: Party): Promise<Party> => {
  console.log('Updating party in DB:', party);
  try {
    const { data, error } = await supabase
      .from('parties')
      .update({ name: party.name, symbol: party.symbol })
      .eq('id', party.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating party:', error);
      throw error;
    }

    console.log('Updated party successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception updating party:', error);
    throw error;
  }
};

export const deletePartyFromDb = async (id: string): Promise<void> => {
  console.log('Deleting party from DB:', id);
  try {
    const { error } = await supabase
      .from('parties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting party:', error);
      throw error;
    }

    console.log('Deleted party successfully');
  } catch (error) {
    console.error('Exception deleting party:', error);
    throw error;
  }
};
