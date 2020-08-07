import React, { Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';
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

const GET_REPO = gql`
  query GetRepo($name: String!, $owner: String!) {
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
        edges {
          node {
            title
            mergeable
            viewerDidAuthor
            reviewDecision
            url
            commits(last: 1) {
              nodes {
                commit {
                  pushedDate
                  statusCheckRollup {
                    state
                    contexts(first: 10) {
                      totalCount
                    }
                  }
                }
              }
            }
            timelineItems(
              itemTypes: [ISSUE_COMMENT, PULL_REQUEST_REVIEW]
              last: 1
            ) {
              edges {
                node {
                  ... on IssueComment {
                    updatedAt
                  }
                  ... on PullRequestReview {
                    updatedAt
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

const renderPRs = (pullRequests: any) =>
  pullRequests.map(({ node }: any) => {
    const { statusCheckRollup, pushedDate } = node.commits.nodes[0].commit;
    const lastActivity =
      node.timelineItems.edges.length > 0
        ? node.timelineItems.edges[0].node.updatedAt
        : undefined;

    return (
      <PullRequest
        key={node.title}
        title={node.title}
        status={statusCheckRollup?.state ?? 'PENDING'}
        numChecks={statusCheckRollup?.contexts.totalCount ?? -1}
        uptoDate={node.mergeable}
        reviewDecision={node.reviewDecision}
        url={node.url}
        lastCodeUpdate={pushedDate}
        lastActivity={lastActivity}
      />
    );
  });

interface RepoProps {
  owner: string;
  name: string;
}
export function Repo({ owner, name }: RepoProps) {
  const { loading, error, data } = useQuery(GET_REPO, {
    variables: { owner, name },
    pollInterval: 60000, // once a minute
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { repository } = data;

  const viewerPRs = repository.pullRequests.edges.filter(
    ({ node }: any) => node.viewerDidAuthor,
  );

  const otherPRs = repository.pullRequests.edges.filter(
    ({ node }: any) => !node.viewerDidAuthor,
  );

  const latestRelease = repository.releases.nodes[0];

  return (
    <Box width="500px" alignY="top">
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
              <Box>
                <Link href={latestRelease.url}>{latestRelease.tagName}</Link>
              </Box>
              <Box>
                <Text use="sub">
                  {format(new Date(latestRelease.publishedAt), 'PP')}
                </Text>
              </Box>
            </Columns.Column>
          </Columns>

          <Divider />
          {repository.pullRequests.totalCount === 0 ? (
            <Text>No open pull requests</Text>
          ) : (
            <Fragment>
              {viewerPRs.length > 0 ? (
                <Fragment>
                  {renderPRs(viewerPRs)}
                  <Divider />
                </Fragment>
              ) : null}

              {renderPRs(otherPRs)}
            </Fragment>
          )}
        </Stack>
      </Card>
    </Box>
  );
}
