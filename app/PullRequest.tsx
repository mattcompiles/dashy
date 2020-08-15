import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Columns, Tag, Button, Link, Stack, Set, Text, Icon } from 'bumbag';
import { formatDistanceToNow } from 'date-fns';
import { useFragment, graphql } from 'relay-hooks';
import { useRecoilValue } from 'recoil';

import { PullRequest_pr$key } from './__generated__/PullRequest_pr.graphql';
import { tokenState } from './state';
import { StatusIndicator } from './StatusIndicator';
import { Switch } from 'bumbag/ts/Switch/styles';

const pullRequestFragment = graphql`
  fragment PullRequest_pr on PullRequest {
    number
    title
    mergeable
    viewerDidAuthor
    reviewDecision
    url
    author {
      avatarUrl
      login
    }
    commits(last: 1) {
      nodes {
        commit {
          pushedDate
          oid
          statusCheckRollup {
            state
            contexts(first: 100) {
              totalCount
              nodes {
                __typename
                ... on StatusContext {
                  avatarUrl
                  state
                  targetUrl
                  description
                }
                ... on CheckRun {
                  name
                  status
                  conclusion
                  detailsUrl
                }
              }
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
    author,
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

  const checks = commits.nodes
    ? commits.nodes[0]?.commit.statusCheckRollup?.contexts.nodes
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
    <div className="flex space-x-3">
      {/* {author ? (
        <img src={author.avatarUrl} className="h-8 mr-2 rounded-full" />
      ) : null} */}
      <div className="flex flex-col space-y-2 flex-grow">
        <a href={url} className="font-sans text-blue-600 text font-medium">
          {title}
        </a>
        <div className="flex space-x-2 font-sans text-xs text-gray-700">
          {lastCodeUpdate ? (
            <div className="flex space-x-2">
              <Icon top="3px" icon="solid-code" />
              <span>{formatDistanceToNow(new Date(lastCodeUpdate))}</span>
            </div>
          ) : null}
          {lastActivity ? (
            <div className="flex space-x-2">
              <Icon top="3px" icon="solid-comment" />
              <span>{formatDistanceToNow(new Date(lastActivity))}</span>
            </div>
          ) : null}
        </div>
        {canMerge ? <Button size="small">Merge</Button> : null}
        {!mergeable ? (
          <Button size="small" onClick={updatePR}>
            Update
          </Button>
        ) : null}
      </div>
      <div className="w-10">
        {checks ? (
          <StatusIndicator
            checks={checks.map((check) => {
              if (check?.__typename === 'StatusContext') {
                switch (check.state) {
                  case 'ERROR':
                  case 'FAILURE': {
                    return 'CRITICAL';
                  }

                  case 'PENDING': {
                    return 'CAUTION';
                  }

                  case 'SUCCESS': {
                    return 'SUCCESS';
                  }

                  default: {
                    return 'UNKNOWN';
                  }
                }
              }

              if (check?.__typename === 'CheckRun') {
                if (check.status !== 'COMPLETED') {
                  return 'CAUTION';
                }

                switch (check.conclusion) {
                  case 'SUCCESS': {
                    return 'SUCCESS';
                  }

                  case 'CANCELLED':
                  case 'FAILURE':
                  case 'TIMED_OUT': {
                    return 'CRITICAL';
                  }

                  default: {
                    return 'UNKNOWN';
                  }
                }
              }

              return 'UNKNOWN';
            })}
          />
        ) : null}

        {/* <StatusIndicator
          checks={[
            (() => {
              switch (reviewDecision) {
                case 'APPROVED': {
                  return 'SUCCESS';
                }

                case 'REVIEW_REQUIRED': {
                  return 'CAUTION';
                }

                case 'CHANGES_REQUESTED': {
                  return 'CRITICAL';
                }

                default: {
                  return 'UNKNOWN';
                }
              }
            })(),
          ]}
        /> */}
      </div>
    </div>
  );
}
