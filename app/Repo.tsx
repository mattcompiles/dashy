import React, { ReactNode } from 'react';
import { graphql, useQuery } from 'relay-hooks';
import { Text, Icon } from 'bumbag';
import { useRecoilValue } from 'recoil';

import { PullRequest } from './PullRequest';
import { RepoQuery } from './__generated__/RepoQuery.graphql';
import { lastFetchState } from './state';
import { Item } from './System/Item';

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

interface DetailProps {
  label: ReactNode;
  value: ReactNode;
}

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
  const pullRequests = repository.pullRequests?.nodes ?? [];
  const totalPRs = repository.pullRequests.totalCount;

  return (
    <Item type="Repo">
      <div className="flex justify-between">
        <div>
          <div className="block font-sans font-medium text-sm text-gray-500">
            <a href={`https://github.com/${owner}`} className="hover:underline">
              {owner}
            </a>{' '}
            /
          </div>
          <a
            href={repository.url}
            className="block font-sans text-lg font-medium hover:underline"
          >
            {name}
          </a>
        </div>
        {repository.homepageUrl ? (
          <a
            href={repository.homepageUrl}
            className="flex text-gray-500 hover:text-black"
          >
            <span className="pr-1">
              <Icon fontSize="200" top="7px" icon="solid-globe-asia">
                {repository.homepageUrl}
              </Icon>
            </span>
          </a>
        ) : null}
      </div>

      <div>
        <div className="pb-4 space-y-4 divide-y">
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
    </Item>
  );
}
