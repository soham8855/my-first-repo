
import { supabase, Vote } from '@/lib/supabase';
import { showToast } from '@/utils/toastUtils';

export const castVoteInDb = async (voterId: string, candidateId: string, hash: string, blockchainTxHash?: string | null): Promise<Vote> => {
  console.log('Casting vote in DB:', { voterId, candidateId, hash, blockchainTxHash });
  try {
    // First update voter's status
    const { error: voterError } = await supabase
      .from('users')
      .update({ has_voted: true })
      .eq('id', voterId);

    if (voterError) {
      console.error('Error updating voter status:', voterError);
      throw voterError;
    }

    // Then record the vote
    const { data, error } = await supabase
      .from('votes')
      .insert([{
        voter_id: voterId,
        candidate_id: candidateId,
        hash: hash,
        blockchain_tx_hash: blockchainTxHash,
        timestamp: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error casting vote:', error);
      throw error;
    }

    console.log('Vote cast successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception casting vote:', error);
    throw error;
  }
};

export const fetchVotes = async (): Promise<Vote[]> => {
  console.log('Fetching votes...');
  try {
    const { data, error } = await supabase
      .from('votes')
      .select('*');

    if (error) {
      console.error('Error fetching votes:', error);
      throw error;
    }

    console.log('Fetched votes:', data);
    return data || [];
  } catch (error) {
    console.error('Exception fetching votes:', error);
    throw error;
  }
};
