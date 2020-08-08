/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MergeableState = "CONFLICTING" | "MERGEABLE" | "UNKNOWN" | "%future added value";
export type PullRequestReviewDecision = "APPROVED" | "CHANGES_REQUESTED" | "REVIEW_REQUIRED" | "%future added value";
export type StatusState = "ERROR" | "EXPECTED" | "FAILURE" | "PENDING" | "SUCCESS" | "%future added value";
export type PullRequest_pr = {
    readonly title: string;
    readonly mergeable: MergeableState;
    readonly viewerDidAuthor: boolean;
    readonly reviewDecision: PullRequestReviewDecision | null;
    readonly url: string;
    readonly commits: {
        readonly nodes: ReadonlyArray<{
            readonly commit: {
                readonly pushedDate: string | null;
                readonly statusCheckRollup: {
                    readonly state: StatusState;
                    readonly contexts: {
                        readonly totalCount: number;
                    };
                } | null;
            };
        } | null> | null;
    };
    readonly timelineItems: {
        readonly nodes: ReadonlyArray<{
            readonly updatedAt?: string;
        } | null> | null;
    };
    readonly " $refType": "PullRequest_pr";
};
export type PullRequest_pr$data = PullRequest_pr;
export type PullRequest_pr$key = {
    readonly " $data"?: PullRequest_pr$data;
    readonly " $fragmentRefs": FragmentRefs<"PullRequest_pr">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "last",
  "value": 1
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "updatedAt",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PullRequest_pr",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mergeable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerDidAuthor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reviewDecision",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v0/*: any*/)
      ],
      "concreteType": "PullRequestCommitConnection",
      "kind": "LinkedField",
      "name": "commits",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PullRequestCommit",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Commit",
              "kind": "LinkedField",
              "name": "commit",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "pushedDate",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "StatusCheckRollup",
                  "kind": "LinkedField",
                  "name": "statusCheckRollup",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "state",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "first",
                          "value": 10
                        }
                      ],
                      "concreteType": "StatusCheckRollupContextConnection",
                      "kind": "LinkedField",
                      "name": "contexts",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "totalCount",
                          "storageKey": null
                        }
                      ],
                      "storageKey": "contexts(first:10)"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "commits(last:1)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "itemTypes",
          "value": [
            "ISSUE_COMMENT",
            "PULL_REQUEST_REVIEW"
          ]
        },
        (v0/*: any*/)
      ],
      "concreteType": "PullRequestTimelineItemsConnection",
      "kind": "LinkedField",
      "name": "timelineItems",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": (v1/*: any*/),
              "type": "IssueComment",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v1/*: any*/),
              "type": "PullRequestReview",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "timelineItems(itemTypes:[\"ISSUE_COMMENT\",\"PULL_REQUEST_REVIEW\"],last:1)"
    }
  ],
  "type": "PullRequest",
  "abstractKey": null
};
})();
(node as any).hash = 'a6cb42fe64711d7d1af30f0785759771';
export default node;
