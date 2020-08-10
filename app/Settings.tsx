import React, { useState, ChangeEvent } from 'react';
import { Columns, Dialog, Input, Button, Stack } from 'bumbag';
import { useRecoilState } from 'recoil';

import { tilesState } from './state';

export function Settings() {
  const [repoInput, setRepoInput] = useState('');
  const [issueInput, setIssueInput] = useState('');
  const [_, setTiles] = useRecoilState(tilesState);

  const addRepo = () => {
    try {
      const [owner, name] = repoInput.split('/');
      if (owner && name) {
        setTiles((currTiles) => [...currTiles, { type: 'repo', owner, name }]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addIssue = () => {
    try {
      const [repoOwner, repoName, issue] = issueInput.split('/');
      const issueNum = parseInt(issue, 10);

      if (repoOwner && repoName && issue && typeof issueNum === 'number') {
        setTiles((currTiles) => [
          ...currTiles,
          { type: 'issue', repoOwner, repoName, issue: issueNum },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog.Modal baseId="settings">
      <Stack>
        <Columns>
          <Columns.Column spread={8}>
            <Input
              placeholder="owner/repo"
              value={repoInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRepoInput(e.target.value)
              }
            />
          </Columns.Column>
          <Columns.Column spread={4}>
            <Button onClick={addRepo}>Add repo</Button>
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column spread={8}>
            <Input
              placeholder="owner/repo/issue_number"
              value={issueInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIssueInput(e.target.value)
              }
            />
          </Columns.Column>
          <Columns.Column spread={4}>
            <Button onClick={addIssue}>Add issue</Button>
          </Columns.Column>
        </Columns>
      </Stack>
    </Dialog.Modal>
  );
}
