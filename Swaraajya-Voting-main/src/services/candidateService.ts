
import { supabase, Candidate } from '@/lib/supabase';
import { showToast } from '@/utils/toastUtils';

export const fetchCandidates = async (): Promise<Candidate[]> => {
  console.log('Fetching candidates...');
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }

    console.log('Fetched candidates:', data);
    return data || [];
  } catch (error) {
    console.error('Exception fetching candidates:', error);
    throw error;
  }
};

export const addCandidateToDb = async (candidate: Omit<Candidate, 'id'>): Promise<Candidate> => {
  console.log('Adding candidate to DB:', candidate);
  try {
    const { data, error } = await supabase
      .from('candidates')
      .insert([{
        name: candidate.name,
        party_id: candidate.party_id,
        image_url: candidate.image_url
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding candidate:', error);
      throw error;
    }

    console.log('Added candidate successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception adding candidate:', error);
    throw error;
  }
};

export const updateCandidateInDb = async (candidate: Candidate): Promise<Candidate> => {
  console.log('Updating candidate in DB:', candidate);
  try {
    const { data, error } = await supabase
      .from('candidates')
      .update({
        name: candidate.name,
        party_id: candidate.party_id,
        image_url: candidate.image_url
      })
      .eq('id', candidate.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }

    console.log('Updated candidate successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception updating candidate:', error);
    throw error;
  }
};

export const deleteCandidateFromDb = async (id: string): Promise<void> => {
  console.log('Deleting candidate from DB:', id);
  try {
    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }

    console.log('Deleted candidate successfully');
  } catch (error) {
    console.error('Exception deleting candidate:', error);
    throw error;
  }
};
