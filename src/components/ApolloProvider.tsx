'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/graphql-client';
import { ReactNode } from 'react';

export default function GraphQLProvider({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}

