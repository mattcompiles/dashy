import { useState, useEffect } from 'react';

import { App } from '../app/App';
import { Login } from '../app/Login';

const Home = () => {
  const [isAuthed, setAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('githubToken');

    if (token) {
      setAuthed(true);
    }
  }, []);

  return isAuthed ? <App /> : <Login />;
};

export default Home;
