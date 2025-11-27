import { gql } from '@apollo/client/core';

// Get all users and vouches for network overview
export const GET_NETWORK_GRAPH = gql`
  query GetNetworkGraph($first: Int = 1000) {
    users(first: $first, orderBy: score, orderDirection: desc) {
      id
      rank
      score
      isBootstrapNode
      inCount
      outCount
      createdAt
      updatedAt
      stakedAmount
      hasMinimumStake
    }
    vouches(first: $first, orderBy: blockTimestamp, orderDirection: asc) {
      id
      from {
        id
      }
      to {
        id
      }
      blockTimestamp
      rankTo
      scoreFrom
      scoreTo
    }
    network(id: "1") {
      totalUsers
      totalVouches
      bootstrapComplete
      lastUpdated
      minimumStake
      bonusCap
    }
  }
`;

// Get specific user details with neighbors
export const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    user(id: $id) {
      id
      rank
      score
      isBootstrapNode
      inCount
      outCount
      createdAt
      updatedAt
      stakedAmount
      hasMinimumStake
      incomingVouches {
        id
        from {
          id
          rank
          score
          isBootstrapNode
          stakedAmount
          hasMinimumStake
        }
        blockTimestamp
        scoreFrom
      }
      outgoingVouches {
        id
        to {
          id
          rank
          score
          isBootstrapNode
          stakedAmount
          hasMinimumStake
        }
        blockTimestamp
        scoreTo
      }
    }
  }
`;

// Get network timeline for animation
export const GET_NETWORK_TIMELINE = gql`
  query GetNetworkTimeline($first: Int = 1000) {
    vouches(first: $first, orderBy: blockTimestamp, orderDirection: asc) {
      id
      from {
        id
        rank
        score
        isBootstrapNode
      }
      to {
        id
        rank
        score
        isBootstrapNode
      }
      blockTimestamp
      rankTo
      scoreTo
    }
  }
`;

// Get network statistics
export const GET_NETWORK_STATS = gql`
  query GetNetworkStats {
    network(id: "1") {
      totalUsers
      totalVouches
      bootstrapComplete
      lastUpdated
      minimumStake
      bonusCap
    }
    users(first: 10, orderBy: score, orderDirection: desc) {
      id
      score
      rank
      isBootstrapNode
      stakedAmount
      hasMinimumStake
    }
  }
`;

// Search users by address
export const SEARCH_USERS = gql`
  query SearchUsers($searchTerm: String!, $first: Int = 10) {
    users(
      first: $first
      where: { id_contains: $searchTerm }
      orderBy: score
      orderDirection: desc
    ) {
      id
      rank
      score
      isBootstrapNode
      inCount
      outCount
      stakedAmount
      hasMinimumStake
    }
  }
`;

// Get all transactions (vouches) for the transactions tab
export const GET_TRANSACTIONS = gql`
  query GetTransactions($first: Int = 100, $skip: Int = 0) {
    vouches(first: $first, skip: $skip, orderBy: blockTimestamp, orderDirection: desc) {
      id
      from {
        id
        rank
        isBootstrapNode
      }
      to {
        id
        rank
        isBootstrapNode
      }
      transactionHash
      blockNumber
      blockTimestamp
      rankTo
      scoreFrom
      scoreTo
      isBootstrapVouch
    }
  }
`;

