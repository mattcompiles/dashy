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
import { Issue } from './Issue';
import { Settings } from './Settings';
import { tokenState, tilesState } from './state';
import { makeRelayEnvironment } from './relayEnvironment';
import { Refresh } from './Refresh';

function splitTileColumns<T>(tiles: Array<T>): Array<Array<T>> {
  const columnCount = Math.floor(document.body.scrollWidth / 400);

  return Array.from({ length: columnCount }).map((_, columnIndex) => {
    return tiles.filter((_, tileIndex) => {
      if (columnCount === 0) {
        return tileIndex === columnIndex;
      }

      return tileIndex % columnCount === columnIndex;
    });
  });
}

export function App() {
  const tiles = useRecoilValue(tilesState);
  const token = useRecoilValue(tokenState);

  const relayEnvironment = useMemo(() => makeRelayEnvironment(token), [token]);

  useEffect(() => {
    localStorage.setItem('tiles', JSON.stringify(tiles));
  }, [tiles]);

  const tileColumns = splitTileColumns(tiles);

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
            {tileColumns.map((tileColumn, index) => (
              <Columns.Column key={index}>
                <Stack>
                  {tileColumn.map((props) =>
                    props.type === 'repo' ? (
                      <Repo
                        key={`${props.owner}${props.name}`}
                        owner={props.owner}
                        name={props.name}
                      />
                    ) : (
                      <Issue
                        key={`${props.repoOwner}${props.repoName}${props.issue}`}
                        repoOwner={props.repoOwner}
                        repoName={props.repoName}
                        issue={props.issue}
                      />
                    ),
                  )}
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
