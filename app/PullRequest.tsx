import React from 'react';
import { Columns, Tag, Button, Link, Stack, Set, Text } from 'bumbag';
import { formatDistanceToNow } from 'date-fns';
import { useFragment, graphql } from 'relay-hooks';

import {
  PullRequest_pr$key,
  StatusState,
  PullRequestReviewDecision,
} from './__generated__/PullRequest_pr.graphql';

const pullRequestFragment = graphql`
  fragment PullRequest_pr on PullRequest {
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
    timelineItems(itemTypes: [ISSUE_COMMENT, PULL_REQUEST_REVIEW], last: 1) {
      nodes {
        ... on IssueComment {
          updatedAt
        }
        ... on PullRequestReview {
          updatedAt
        }
      }
    }
  }
`;

function reviewDecisionToPallete(
  reviewDecision: PullRequestReviewDecision | null,
) {
  if (reviewDecision === 'APPROVED') {
    return 'success';
  }

  if (reviewDecision === 'CHANGES_REQUESTED') {
    return 'danger';
  }

  return 'warning';
}

function statusToPallete(status: StatusState | undefined) {
  if (status === 'SUCCESS') {
    return 'success';
  }

  if (status === 'ERROR' || status === 'FAILURE') {
    return 'danger';
  }

  return 'warning';
}

interface PullRequestProps {
  pr: PullRequest_pr$key;
}
export function PullRequest({ pr }: PullRequestProps) {
  const {
    title,
    url,
    reviewDecision,
    mergeable,
    commits,
    timelineItems,
  } = useFragment(pullRequestFragment, pr);

  const lastActivity = timelineItems.nodes
    ? timelineItems.nodes[0]?.updatedAt
    : null;

  const lastCodeUpdate = commits.nodes
    ? commits.nodes[0]?.commit.pushedDate
    : null;

  const status = commits.nodes
    ? commits.nodes[0]?.commit.statusCheckRollup?.state
    : undefined;

  const numChecks = commits.nodes
    ? commits.nodes[0]?.commit.statusCheckRollup?.contexts.totalCount
    : null;

  const canMerge =
    mergeable && reviewDecision === 'APPROVED' && status === 'SUCCESS';

  return (
    <Columns>
      <Columns.Column>
        <Stack spacing="minor-1">
          <Link href={url}>{title}</Link>
          <Set>
            {lastCodeUpdate ? (
              <Text use="sup">
                Code:{' '}
                {formatDistanceToNow(new Date(lastCodeUpdate), {
                  addSuffix: true,
                })}
              </Text>
            ) : null}
            {lastActivity ? (
              <Text use="sup">
                Activity:{' '}
                {formatDistanceToNow(new Date(lastActivity), {
                  addSuffix: true,
                })}
              </Text>
            ) : null}
          </Set>
        </Stack>
      </Columns.Column>
      {canMerge ? (
        <Columns.Column spread={2}>
          <Button size="small">Merge</Button>
        </Columns.Column>
      ) : null}
      {!mergeable ? (
        <Columns.Column spread={2}>
          <Button size="small">Update</Button>
        </Columns.Column>
      ) : null}
      <Columns.Column spread={1}>
        <Tag palette={statusToPallete(status)} size="medium">
          {numChecks}
        </Tag>
      </Columns.Column>
      <Columns.Column spread={1}>
        <Tag palette={reviewDecisionToPallete(reviewDecision)} size="medium" />
      </Columns.Column>
    </Columns>
  );
}
