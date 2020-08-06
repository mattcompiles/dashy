import React, { useState, ChangeEvent } from 'react';
import { Columns, Dialog, Input, Button } from 'bumbag';
import { useRecoilState } from 'recoil';

import { reposState } from './state';

export function Settings() {
  const [repoInput, setRepoInput] = useState('');
  const [_, setRepos] = useRecoilState(reposState);

  const addRepo = () => {
    try {
      const [owner, name] = repoInput.split('/');
      if (owner && name) {
        setRepos((currRepos) => [...currRepos, { owner, name }]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog.Modal baseId="settings">
      <Columns>
        <Columns.Column spread={9}>
          <Input
            placeholder="owner/repo"
            value={repoInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRepoInput(e.target.value)
            }
          />
        </Columns.Column>
        <Columns.Column spread={1}>
          <Button onClick={addRepo}>Add</Button>
        </Columns.Column>
      </Columns>
    </Dialog.Modal>
  );
}
