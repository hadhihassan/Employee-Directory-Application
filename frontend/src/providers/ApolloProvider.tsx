'use client';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '../graphql/apolloClient';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
