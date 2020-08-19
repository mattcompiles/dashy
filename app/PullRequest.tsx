import React, { Fragment } from 'react';
import { Icon, Popover } from 'bumbag';
import { formatDistanceToNow } from 'date-fns';
import { useFragment, graphql } from 'relay-hooks';
import { useRecoilValue } from 'recoil';

import { PullRequest_pr$key } from './__generated__/PullRequest_pr.graphql';
import { tokenState } from './state';
import { StatusIndicator } from './StatusIndicator';
import { Badge, Link, Divider, Text } from './System';

const pullRequestFragment = graphql`
  fragment PullRequest_pr on PullRequest {
    number
    title
    mergeable
    viewerDidAuthor
    reviewDecision
    url
    isDraft
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
  last: boolean;
}
export function PullRequest({
  repoName,
  repoOwner,
  pr,
  last,
}: PullRequestProps) {
  const {
    number,
    title,
    url,
    reviewDecision,
    mergeable,
    commits,
    timelineItems,
    isDraft,
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

  const checks = commits.nodes
    ? commits.nodes[0]?.commit.statusCheckRollup?.contexts.nodes
    : null;

  return (
    <Fragment>
      <div className="flex space-x-3">
        {/* {author ? (
        <img src={author.avatarUrl} className="h-8 mr-2 rounded-full" />
      ) : null} */}
        <div className="flex flex-col space-y-2 flex-grow">
          <Link href={url} color="gray-700" weight="medium" hoverUnderline>
            {title}
          </Link>
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
            {isDraft ? <span>Draft</span> : null}
            {!mergeable ? <span>Needs Update</span> : null}
            {reviewDecision === 'APPROVED' ? (
              <Badge tone="positive" nudge={4}>
                Approved
              </Badge>
            ) : null}
            {reviewDecision === 'CHANGES_REQUESTED' ? (
              <Badge tone="critical" nudge={4}>
                Rejected
              </Badge>
            ) : null}
          </div>
        </div>
        <div className="flex-shrink-0 flex-grow-0 w-10">
          {checks ? (
            <Popover.State>
              <Popover.Disclosure>
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
              </Popover.Disclosure>
              <Popover hasArrow>
                <div className="space-y-1">
                  {checks.map((check) => {
                    if (check?.__typename === 'StatusContext') {
                      return (
                        <div className="flex">
                          <img
                            src={check.avatarUrl ?? ''}
                            className="flex-shrink-0"
                          />
                          <Link href={check.targetUrl ?? ''} hoverUnderline>
                            {check.description}
                          </Link>
                          <Text>{check.state}</Text>
                        </div>
                      );
                    }
                  })}
                </div>
              </Popover>
            </Popover.State>
          ) : null}
        </div>
      </div>
      {!last ? <Divider space={4} /> : null}
    </Fragment>
  );
}
