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
    <Card footer={<Text use="sub">{}</Text>}>
      <Stack spacing="major-1">
        <Columns>
          <Columns.Column>
            <Stack>
              <Set>
                {repository.homepageUrl ? (
                  <Link href={repository.homepageUrl}>
                    <Icon fontSize="300" top="3px" icon="solid-globe-asia">
                      {repository.homepageUrl}
                    </Icon>
                  </Link>
                ) : null}
                <Link href={repository.url}>
                  <Heading use="h4">{name}</Heading>
                </Link>
              </Set>
            </Stack>
          </Columns.Column>
          <Columns.Column spread={3}>
            {latestRelease ? (
              <Fragment>
                <Box>
                  <Link href={latestRelease.url}>{latestRelease.tagName}</Link>
                </Box>
                {latestRelease.publishedAt ? (
                  <Box>
                    <Text use="sub">
                      {format(new Date(latestRelease.publishedAt), 'PP')}
                    </Text>
                  </Box>
                ) : null}
              </Fragment>
            ) : null}
          </Columns.Column>
        </Columns>

        <Divider />
        {repository.pullRequests.totalCount === 0 ? (
          <Text>No open pull requests</Text>
        ) : (
          pullRequests
            .map((node, index) => {
              return node ? <PullRequest key={index} pr={node} /> : null;
            })
            .filter(Boolean)
        )}
        {totalPRs > PR_COUNT ? <Text>{totalPRs - PR_COUNT} more</Text> : null}
      </Stack>
    </Card>
  );
}
