import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Columns, Tag, Button, Link, Stack, Set, Text, Icon } from 'bumbag';
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
      <div>
        {author ? (
          <img src={author.avatarUrl} className="h-8 mr-2 rounded-full" />
        ) : null}
      </div>
      <div className="flex flex-col space-y-2 flex-grow">
        <a href={url} className="font-sans text-blue-600 text-sm">
          {title}
        </a>
        <div className="self-end flex space-x-2 font-sans text-xs text-gray-700">
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
      <div>
        <div className="flex space-x-1">
          <div
            className={clsx(
              'h-8 w-8 rounded-full flex items-center justify-center',
              {
                'bg-green-400': status === 'SUCCESS',
                'bg-red-600': status === 'ERROR' || status === 'FAILURE',
                'bg-orange-500': status === 'EXPECTED',
              },
            )}
          >
            {numChecks}
          </div>
          <div
            className={clsx(
              'h-8 w-8 rounded-full flex items-center justify-center',
              {
                'bg-green-400': reviewDecision === 'APPROVED',
                'bg-red-600': reviewDecision === 'CHANGES_REQUESTED',
                'bg-orange-500': reviewDecision === 'REVIEW_REQUIRED',
              },
            )}
          />
        </div>
      </div>
    </div>
  );
}
