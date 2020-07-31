import got from 'got';
import queryString from 'query-string';
import { useEffect } from 'react';

export async function getServerSideProps({ query }) {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const { code } = queryString.parse(query);

  const { body } = await got.post(
    'https://github.com/login/oauth/access_token',
    {
      json: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      responseType: 'json',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  console.log(body);

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
