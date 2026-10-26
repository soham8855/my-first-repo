
// Client-side types for our application
export interface Party {
  id: string;
  name: string;
  symbol: string;
}

export interface Candidate {
  id: string;
  name: string;
  partyId: string;
  imageUrl: string;
}

export interface Voter {
  id: string;
  name: string;
  email: string;
  aadhaarNumber: string;
  hasVoted: boolean;
}

export interface Vote {
  id: string;
  voterId: string;
  candidateId: string;
  timestamp: string;
}
