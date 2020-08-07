import React, { useEffect, useMemo } from 'react';
import { Set, Box, Button, Modal } from 'bumbag';
import { useRecoilValue } from 'recoil';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';

import { Repo } from './Repo';
import { Settings } from './Settings';
import { reposState, tokenState } from './state';

const cache = new InMemoryCache();

export function App() {
  const repos = useRecoilValue(reposState);
  const token = useRecoilValue(tokenState);

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: 'https://api.github.com/graphql',
        cache,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    [token],
  );

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repos));
  }, [repos]);

  return (
    <ApolloProvider client={client}>
      <Box alignX="center">
        <Set alignY="top">
          {repos.map(({ owner, name }: any) => (
            <Repo key={`${owner}${name}`} owner={owner} name={name} />
          ))}
        </Set>
        <Modal.State>
          <Box position="fixed" bottom="20px" right="20px">
            <Modal.Disclosure use={Button}>Settings</Modal.Disclosure>
          </Box>
          <Settings />
        </Modal.State>
      </Box>
    </ApolloProvider>
  );
}
