import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { Repo } from './Repo';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `bearer ${localStorage.getItem('githubToken')}`,
  },
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <Repo />
    </ApolloProvider>
  );
}
