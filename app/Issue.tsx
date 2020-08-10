import React, { Fragment } from 'react';
import { graphql, useQuery } from 'relay-hooks';
import {
  Divider,
  Card,
  Stack,
  Text,
  Link,
  Set,
  Box,
  Badge,
  Columns,
  Avatar,
} from 'bumbag';
import { useRecoilValue } from 'recoil';
import pluralize from 'pluralize';
import { format } from 'date-fns';

import { lastFetchState } from './state';
import { IssueQuery } from './__generated__/IssueQuery.graphql';

const GET_ISSUE = graphql`
  query IssueQuery($repoName: String!, $repoOwner: String!, $issue: Int!) {
    repository(name: $repoName, owner: $repoOwner) {
      issue(number: $issue) {
        url
        title
        updatedAt
        closed
        comments(last: 1) {
          totalCount
          nodes {
            bodyText
            updatedAt
            author {
              avatarUrl
              url
              login
            }
          }
        }
      }
    }
  }
`;

interface RepoProps {
  repoOwner: string;
  repoName: string;
  issue: number;
}
export function Issue({ repoOwner, repoName, issue }: RepoProps) {
  const lastFetch = useRecoilValue(lastFetchState);
  const { error, props } = useQuery<IssueQuery>(
    GET_ISSUE,
    {
      repoOwner,
      repoName,
      issue,
    },
    { fetchKey: lastFetch.getTime(), fetchPolicy: 'store-and-network' },
  );

  if (!props || !props.repository) return <p>Loading...</p>;
  if (error || !props.repository.issue) return <p>Error :(</p>;

  const { url, title, closed, comments } = props.repository.issue;

  const lastComment = comments.nodes ? comments.nodes[0] : null;

  return (
    <Card footer={<Text use="sub">{}</Text>}>
      <Stack spacing="major-1">
        <Set>
          <Badge size="medium" palette={closed ? 'danger' : 'success'}>
            {closed ? 'Closed' : 'Open'}
          </Badge>
          <Link href={url}>{title}</Link>
        </Set>
        <Box>
          <Link href={`https://github.com/${repoOwner}/${repoName}`}>
            {repoOwner}/{repoName}
          </Link>
        </Box>
        <Text>
          {comments.totalCount} {pluralize('comments', comments.totalCount)}
        </Text>
        <Divider />
        {lastComment ? (
          <Fragment>
            <Text>Last comment</Text>
            <Columns spacing="major-1">
              <Columns.Column spread={2}>
                <Avatar
                  variant="circle"
                  size="small"
                  src={lastComment.author?.avatarUrl}
                />
              </Columns.Column>
              <Columns.Column spread={8}>
                <Stack spacing="minor-1">
                  <Box>
                    <Text use="sub">{lastComment.author?.login}</Text>
                  </Box>
                  <Box>
                    <Text>{lastComment.bodyText}</Text>
                  </Box>
                  <Box>
                    <Text use="sub">
                      {format(new Date(lastComment.updatedAt), 'PP')}
                    </Text>
                  </Box>
                </Stack>
              </Columns.Column>
            </Columns>
          </Fragment>
        ) : null}
      </Stack>
    </Card>
  );
}
