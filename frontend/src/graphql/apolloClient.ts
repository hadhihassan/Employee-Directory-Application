import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { Employee } from "../types/employee";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllEmployees: {
            merge(existing: Employee[] = [], incoming: Employee[]):Employee[] { return incoming; }
          }
        }
      }
    }
  })
});
