import React, { useEffect, useMemo } from 'react';
import {
  Columns,
  Box,
  Button,
  Modal,
  Stack,
  PageWithHeader,
  TopNav,
} from 'bumbag';
import { useRecoilValue } from 'recoil';
import { RelayEnvironmentProvider } from 'relay-hooks';

import { Repo } from './Repo';
import { Settings } from './Settings';
import { reposState, tokenState } from './state';
import { makeRelayEnvironment } from './relayEnvironment';
import { Refresh } from './Refresh';

function splitRepoColumns(repos: Array<any>) {
  const columnCount = Math.floor(document.body.scrollWidth / 400);

  return Array.from({ length: columnCount }).map((_, columnIndex) => {
    return repos.filter((_, repoIndex) => {
      if (columnCount === 0) {
        return repoIndex === columnIndex;
      }

      return repoIndex % columnCount === columnIndex;
    });
  });
}

export function App() {
  const repos = useRecoilValue(reposState);
  const token = useRecoilValue(tokenState);

  const relayEnvironment = useMemo(() => makeRelayEnvironment(token), [token]);

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repos));
  }, [repos]);

  const repoColumns = splitRepoColumns(repos);

  const header = (
    <TopNav>
      <TopNav.Section>
        <TopNav.Item href="#">Dashy</TopNav.Item>
      </TopNav.Section>
      <TopNav.Section marginRight="major-2">
        <TopNav.Item>
          <Refresh />
        </TopNav.Item>
      </TopNav.Section>
    </TopNav>
  );

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <PageWithHeader header={header}>
        <Box padding="major-3">
          <Columns spacing="major-3">
            {repoColumns.map((repoColumn, index) => (
              <Columns.Column key={index}>
                <Stack>
                  {repoColumn.map(({ owner, name }: any) => (
                    <Repo key={`${owner}${name}`} owner={owner} name={name} />
                  ))}
                </Stack>
              </Columns.Column>
            ))}
          </Columns>
        </Box>
        <Modal.State>
          <Box position="fixed" bottom="20px" right="20px">
            <Modal.Disclosure use={Button}>Settings</Modal.Disclosure>
          </Box>
          <Settings />
        </Modal.State>
      </PageWithHeader>
    </RelayEnvironmentProvider>
  );
}
