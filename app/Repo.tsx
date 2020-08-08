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
} from 'bumbag';
import { format } from 'date-fns';

import { PullRequest } from './PullRequest';
import { RepoQuery } from './__generated__/RepoQuery.graphql';
import { PullRequest_pr$key } from './__generated__/PullRequest_pr.graphql';

const GET_REPO = graphql`
  query RepoQuery($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      url
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
        first: 10
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

const renderPRs = (pullRequests: Array<PullRequest_pr$key | null>) =>
  pullRequests
    .map((node, index) => {
      return node ? <PullRequest key={index} pr={node} /> : null;
    })
    .filter(Boolean);

interface RepoProps {
  owner: string;
  name: string;
}
export function Repo({ owner, name }: RepoProps) {
  const { error, props } = useQuery<RepoQuery>(GET_REPO, { owner, name });

  if (!props || !props.repository) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { repository } = props;

  const releases = repository.releases?.nodes;
  const latestRelease = releases ? releases[0] : null;
  const pullRequests = repository.pullRequests?.nodes ?? [];

  return (
    <Card>
      <Stack spacing="major-1">
        <Columns>
          <Columns.Column spread={1}>
            <Badge palette="success" />
          </Columns.Column>
          <Columns.Column>
            <Link href={repository.url}>
              <Heading use="h4">{name}</Heading>
            </Link>
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
      </Stack>
    </Card>
  );
}
