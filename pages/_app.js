import NextApp from 'next/app';
import { Provider as BumbagProvider } from 'bumbag';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization:
      typeof localStorage === 'object'
        ? `bearer ${localStorage.getItem('githubToken')}`
        : '',
  },
});

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApolloProvider client={client}>
        <BumbagProvider>
          <Component {...pageProps} />
        </BumbagProvider>
      </ApolloProvider>
    );
  }
}
