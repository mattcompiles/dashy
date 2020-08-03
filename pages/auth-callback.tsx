import got from 'got';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const { body } = await got.post<{ access_token: string }>(
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

  return {
    props: { githubToken: body.access_token },
  };
};

interface AuthCallBackProps {
  githubToken: string;
}
function AuthCallback({ githubToken }: AuthCallBackProps) {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('githubToken', githubToken);

    router.push('/');
  }, [githubToken, router]);

  return <div>Logged in, redirecting back home</div>;
}

export default AuthCallback;
