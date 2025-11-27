export interface User {
  id: string;
  rank: string;
  score: string;
  isBootstrapNode: boolean;
  inCount: number;
  outCount: number;
  createdAt: string;
  updatedAt: string;
  stakedAmount: string;
  hasMinimumStake: boolean;
}

export interface Vouch {
  id: string;
  from: {
    id: string;
    rank?: string;
    score?: string;
    isBootstrapNode?: boolean;
  };
  to: {
    id: string;
    rank?: string;
    score?: string;
    isBootstrapNode?: boolean;
  };
  blockTimestamp: string;
  rankTo?: string;
  scoreFrom?: string;
  scoreTo?: string;
  transactionHash?: string;
  blockNumber?: string;
  isBootstrapVouch?: boolean;
}

export interface Network {
  totalUsers: string;
  totalVouches: string;
  bootstrapComplete: boolean;
  lastUpdated: string;
  minimumStake: string;
  bonusCap: string;
}

export interface NetworkGraphData {
  users: User[];
  vouches: Vouch[];
  network: Network | null;
}

export interface UserDetails extends User {
  incomingVouches: Array<{
    id: string;
    from: User;
    blockTimestamp: string;
    scoreFrom: string;
  }>;
  outgoingVouches: Array<{
    id: string;
    to: User;
    blockTimestamp: string;
    scoreTo: string;
  }>;
}

