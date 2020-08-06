import React from 'react';
import { Columns, Tag, Button, Link, Stack, Set, Text } from 'bumbag';
import { formatDistanceToNow } from 'date-fns';

type Status = 'EXPECTED' | 'ERROR' | 'FAILURE' | 'PENDING' | 'SUCCESS';
type ReviewDecision = 'CHANGES_REQUESTED' | 'APPROVED' | 'REVIEW_REQUIRED';

function reviewDecisionToPallete(reviewDecision: ReviewDecision) {
  if (reviewDecision === 'APPROVED') {
    return 'success';
  }

  if (reviewDecision === 'CHANGES_REQUESTED') {
    return 'danger';
  }

  return 'warning';
}

function statusToPallete(status: Status) {
  if (status === 'SUCCESS') {
    return 'success';
  }

  if (status === 'ERROR' || status === 'FAILURE') {
    return 'danger';
  }

  return 'warning';
}

interface PullRequestProps {
  title: string;
  numChecks: number;
  status: Status;
  uptoDate: boolean;
  reviewDecision: ReviewDecision;
  url: string;
  lastCodeUpdate: string;
  lastActivity?: string;
}
export function PullRequest({
  title,
  status,
  numChecks,
  uptoDate,
  reviewDecision,
  url,
  lastCodeUpdate,
  lastActivity,
}: PullRequestProps) {
  const mergeable =
    uptoDate && reviewDecision === 'APPROVED' && status === 'SUCCESS';

  return (
    <Columns>
      <Columns.Column>
        <Stack spacing="minor-1">
          <Link href={url}>{title}</Link>
          <Set>
            <Text use="sup">
              Code:{' '}
              {formatDistanceToNow(new Date(lastCodeUpdate), {
                addSuffix: true,
              })}
            </Text>
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
      {mergeable ? (
        <Columns.Column spread={2}>
          <Button size="small">Merge</Button>
        </Columns.Column>
      ) : null}
      {!uptoDate ? (
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
