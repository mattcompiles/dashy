import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from 'relay-runtime';

const makeFetchQuery = (token?: string): FetchFunction => (
  operation,
  variables,
) => {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github.antiope-preview+json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => response.json());
};

export const makeRelayEnvironment = (token?: string) =>
  new Environment({
    network: Network.create(makeFetchQuery(token)),
    store: new Store(new RecordSource()),
  });
