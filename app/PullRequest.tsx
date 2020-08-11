import React from 'react';
import { Columns, Tag, Button, Link, Stack, Set, Text } from 'bumbag';
import { formatDistanceToNow } from 'date-fns';
import { useFragment, graphql } from 'relay-hooks';
import { useRecoilValue } from 'recoil';

import {
  PullRequest_pr$key,
  StatusState,
  PullRequestReviewDecision,
} from './__generated__/PullRequest_pr.graphql';
import { tokenState } from './state';

const pullRequestFragment = graphql`
  fragment PullRequest_pr on PullRequest {
    number
    title
    mergeable
    viewerDidAuthor
    reviewDecision
    url
    commits(last: 1) {
      nodes {
        commit {
          pushedDate
          oid
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
  repoName: string;
  repoOwner: string;
}
export function PullRequest({ repoName, repoOwner, pr }: PullRequestProps) {
  const {
    number,
    title,
    url,
    reviewDecision,
    mergeable,
    commits,
    timelineItems,
  } = useFragment(pullRequestFragment, pr);
  const token = useRecoilValue(tokenState);

  const lastActivity = timelineItems.nodes
    ? timelineItems.nodes[0]?.updatedAt
    : null;

  const latestCommit = commits.nodes ? commits.nodes[0]?.commit : null;

  const lastCodeUpdate = latestCommit ? latestCommit.pushedDate : null;

  const status = commits.nodes
    ? commits.nodes[0]?.commit.statusCheckRollup?.state
    : undefined;

  const numChecks = commits.nodes
    ? commits.nodes[0]?.commit.statusCheckRollup?.contexts.totalCount
    : null;

  const canMerge =
    mergeable && reviewDecision === 'APPROVED' && status === 'SUCCESS';

  const updatePR = () => {
    fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/pulls/${number}/update-branch`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.github.lydian-preview+json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          expected_head_sha: latestCommit?.oid,
        }),
      },
    )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
          <Button size="small" onClick={updatePR}>
            Update
          </Button>
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
