import { useState, useEffect } from 'react';

import { App } from '../app/App';

const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

const Home = () => {
  const [isAuthed, setAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('githubToken');

    if (token) {
      setAuthed(true);
    }
  }, []);

  return isAuthed ? (
    <App />
  ) : (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`}
      >
        Login
      </a>
    </div>
  );
};

export default Home;
