import React, { Fragment } from 'react';
import { graphql, useQuery } from 'relay-hooks';
import {
  Box,
  Heading,
  Card,
  Columns,
  Badge,
  Stack,
  Divider,
  Text,
  Link,
  Icon,
  Level,
  Set,
} from 'bumbag';
import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';

import { PullRequest } from './PullRequest';
import { RepoQuery } from './__generated__/RepoQuery.graphql';
import { lastFetchState } from './state';

const PR_COUNT = 3;

const GET_REPO = graphql`
  query RepoQuery($name: String!, $owner: String!, $prCount: Int!) {
    repository(name: $name, owner: $owner) {
      url
      homepageUrl
      releases(last: 1) {
        nodes {
          publishedAt
          description
          url
          tagName
        }
      }
      pullRequests(
        states: OPEN
        first: $prCount
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          ...PullRequest_pr
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
  const lastFetch = useRecoilValue(lastFetchState);
  const { error, props } = useQuery<RepoQuery>(
    GET_REPO,
    {
      owner,
      name,
      prCount: PR_COUNT,
    },
    { fetchKey: lastFetch.getTime(), fetchPolicy: 'store-and-network' },
  );

  if (!props || !props.repository) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { repository } = props;

  const releases = repository.releases?.nodes;
  const latestRelease = releases ? releases[0] : null;
  const pullRequests = repository.pullRequests?.nodes ?? [];
  const totalPRs = repository.pullRequests.totalCount;

  return (
    <div className="rounded-md shadow-md bg-white pb-2">
      <div className="space-y-1 divide-y-2">
        <div className="flex p-4 space-x-3 border-bt">
          {repository.homepageUrl ? (
            <a href={repository.homepageUrl} className="text-blue-600">
              <Icon fontSize="300" top="9px" icon="solid-globe-asia">
                {repository.homepageUrl}
              </Icon>
            </a>
          ) : null}
          <a
            href={repository.url}
            className="font-sans text-2xl font-bold text-blue-600"
          >
            {name}
          </a>
        </div>
        <div className="px-4 py-2 space-y-4">
          {repository.pullRequests.totalCount === 0 ? (
            <Text>No open pull requests</Text>
          ) : (
            pullRequests
              .map((node, index) => {
                return node ? (
                  <PullRequest
                    key={index}
                    pr={node}
                    repoName={name}
                    repoOwner={owner}
                  />
                ) : null;
              })
              .filter(Boolean)
          )}
          {totalPRs > PR_COUNT ? <Text>{totalPRs - PR_COUNT} more</Text> : null}
        </div>
      </div>
    </div>
  );
}
