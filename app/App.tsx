import React from 'react';
import { Set, Box } from 'bumbag';

import { Repo } from './Repo';

export function App() {
  const repos = JSON.parse(localStorage.getItem('repos') ?? '[]');

  return (
    <Box alignX="center">
      <Set alignY="top">
        {repos.map(({ owner, name }: any) => (
          <Repo key={`${owner}${name}`} owner={owner} name={name} />
        ))}
      </Set>
    </Box>
  );
}
