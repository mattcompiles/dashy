import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_REPO = gql`
  query GetRepo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      pullRequests(states: OPEN, first: 10) {
        edges {
          node {
            title
            mergeable
            viewerDidAuthor
            commits(first: 1) {
              nodes {
                commit {
                  status {
                    contexts {
                      state
                      description
                      targetUrl
                    }
                    state
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface RepoProps {
  owner: string;
  name: string;
}
export function Repo({ owner, name }: RepoProps) {
  const { loading, error, data } = useQuery(GET_REPO, {
    variables: { owner, name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
