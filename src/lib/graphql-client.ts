import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL || 'http://localhost:8000/subgraphs/name/sybvouch-network';

const httpLink = new HttpLink({
  uri: SUBGRAPH_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

