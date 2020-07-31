import got from 'got';
import { useEffect } from 'react';

export async function getServerSideProps({ query }) {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const { body } = await got.post(
    'https://github.com/login/oauth/access_token',
    {
      json: {
        client_id: clientId,
        client_secret: clientSecret,
        code: query.code,
      },
      responseType: 'json',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  console.log(query, body);

  return {
    props: { githubToken: body.access_token },
  };
}

function AuthCallback({ githubToken }) {
  useEffect(() => {
    localStorage.setItem('githubToken', githubToken);
  }, [githubToken]);

  return <div>Logged in!</div>;
}

export default AuthCallback;
