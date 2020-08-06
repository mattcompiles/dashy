import React, { useEffect } from 'react';
import { Set, Box, Button, Modal } from 'bumbag';
import { useRecoilValue } from 'recoil';

import { Repo } from './Repo';
import { Settings } from './Settings';
import { reposState } from './state';

export function App() {
  const repos = useRecoilValue(reposState);

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repos));
  }, [repos]);

  return (
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
  );
}
