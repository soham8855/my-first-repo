
import { supabase, Voter } from '@/lib/supabase';
import { showToast } from '@/utils/toastUtils';

export const fetchVoters = async (): Promise<Voter[]> => {
  console.log('Fetching voters...');
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching voters:', error);
      throw error;
    }

    console.log('Fetched voters:', data);
    return data || [];
  } catch (error) {
    console.error('Exception fetching voters:', error);
    throw error;
  }
};

export const addVoterToDb = async (voter: Omit<Voter, 'id' | 'has_voted'>): Promise<Voter> => {
  console.log('Adding voter to DB:', voter);
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: voter.name,
        email: voter.email,
        aadhaar_number: voter.aadhaar_number,
        has_voted: false,
        role: 'voter'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding voter:', error);
      throw error;
    }

    console.log('Added voter successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception adding voter:', error);
    throw error;
  }
};

export const updateVoterInDb = async (voter: Voter): Promise<Voter> => {
  console.log('Updating voter in DB:', voter);
  try {
    // Ensure the has_voted property is correctly passed
    const { data, error } = await supabase
      .from('users')
      .update({
        name: voter.name,
        email: voter.email,
        aadhaar_number: voter.aadhaar_number,
        has_voted: voter.has_voted
      })
      .eq('id', voter.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating voter:', error);
      throw error;
    }

    console.log('Updated voter successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception updating voter:', error);
    throw error;
  }
};

export const deleteVoterFromDb = async (id: string): Promise<void> => {
  console.log('Deleting voter from DB:', id);
  try {
    // First, delete any votes associated with this voter
    const { error: votesError } = await supabase
      .from('votes')
      .delete()
      .eq('voter_id', id);

    if (votesError) {
      console.error('Error deleting voter votes:', votesError);
      throw votesError;
    }

    // Then delete the voter
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting voter:', error);
      throw error;
    }

    console.log('Deleted voter successfully');
  } catch (error) {
    console.error('Exception deleting voter:', error);
    throw error;
  }
};
