import React, { useState, ChangeEvent } from 'react';
import { Box, Link, Stack, Text, Input, Columns, Button } from 'bumbag';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { tokenState } from './state';

const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

export function Login() {
  const [inputToken, setInputToken] = useState('');
  const [_, setToken] = useRecoilState(tokenState);
  const router = useRouter();

  const loadToken = () => {
    if (inputToken) {
      setToken(inputToken);

      localStorage.setItem('githubToken', inputToken);

      router.reload();
    }
  };

  return (
    <Box>
      <Stack>
        <Link
          href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`}
        >
          Login
        </Link>
        <Text> or use a token (with repo scope)</Text>
        <Columns>
          <Columns.Column spread={9}>
            <Input
              placeholder="Personal access token"
              value={inputToken}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputToken(e.target.value)
              }
            />
          </Columns.Column>
          <Columns.Column spread={3}>
            <Button onClick={loadToken}>Use token</Button>
          </Columns.Column>
        </Columns>
      </Stack>
    </Box>
  );
}
