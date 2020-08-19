import React, { Fragment } from 'react';
import { graphql, useQuery } from 'relay-hooks';
import { Divider, Stack, Text, Box, Columns, Avatar } from 'bumbag';
import { useRecoilValue } from 'recoil';
import pluralize from 'pluralize';
import { format } from 'date-fns';

import { lastFetchState } from './state';
import { IssueQuery } from './__generated__/IssueQuery.graphql';
import { Badge, Item } from './System';

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
    <Item type="Issue">
      <div className="space-y-2">
        <div className="flex justify-between">
          <div>
            <div className="block font-sans font-medium text-sm text-gray-500">
              <a
                href={`https://github.com/${repoOwner}`}
                className="hover:underline"
              >
                {repoOwner}
              </a>{' '}
              /{' '}
              <a
                href={`https://github.com/${repoOwner}/${repoName}`}
                className="hover:underline"
              >
                {repoName}
              </a>
            </div>
            <a
              href={url}
              className="block font-sans text-lg font-medium hover:underline"
            >
              {title}
            </a>
          </div>

          <div className="inline">
            <Badge tone={closed ? 'critical' : 'positive'}>
              {closed ? 'Closed' : 'Open'}
            </Badge>
          </div>
        </div>

        <div className="text-sans text-gray-700 text-sm">
          {comments.totalCount} {pluralize('comments', comments.totalCount)}
        </div>
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
      </div>
    </Item>
  );
}
