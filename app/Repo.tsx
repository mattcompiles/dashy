import React from 'react';
import { useQuery, gql } from '@apollo/client';

const REPO_QUERY = gql`
  {
    repository(name: "braid-design-system", owner: "seek-oss") {
      pullRequests(states: OPEN, first: 10) {
        edges {
          node {
            mergeable
            potentialMergeCommit {
              status {
                contexts {
                  id
                  state
                  description
                }
                state
              }
            }
            title
          }
        }
      }
      name
    }
  }
`;

export function Repo() {
  const { loading, error, data } = useQuery(REPO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
