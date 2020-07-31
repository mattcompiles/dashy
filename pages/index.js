const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

const Home = () => (
  <div>
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`}
    >
      Login
    </a>
  </div>
);

export default Home;
