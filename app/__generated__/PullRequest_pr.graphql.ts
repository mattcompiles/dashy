/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CheckConclusionState = "ACTION_REQUIRED" | "CANCELLED" | "FAILURE" | "NEUTRAL" | "SKIPPED" | "STALE" | "SUCCESS" | "TIMED_OUT" | "%future added value";
export type CheckStatusState = "COMPLETED" | "IN_PROGRESS" | "QUEUED" | "REQUESTED" | "%future added value";
export type MergeableState = "CONFLICTING" | "MERGEABLE" | "UNKNOWN" | "%future added value";
export type PullRequestReviewDecision = "APPROVED" | "CHANGES_REQUESTED" | "REVIEW_REQUIRED" | "%future added value";
export type StatusState = "ERROR" | "EXPECTED" | "FAILURE" | "PENDING" | "SUCCESS" | "%future added value";
export type PullRequest_pr = {
    readonly number: number;
    readonly title: string;
    readonly mergeable: MergeableState;
    readonly viewerDidAuthor: boolean;
    readonly reviewDecision: PullRequestReviewDecision | null;
    readonly url: string;
    readonly isDraft: boolean;
    readonly author: {
        readonly avatarUrl: string;
        readonly login: string;
    } | null;
    readonly commits: {
        readonly nodes: ReadonlyArray<{
            readonly commit: {
                readonly pushedDate: string | null;
                readonly oid: string;
                readonly statusCheckRollup: {
                    readonly state: StatusState;
                    readonly contexts: {
                        readonly totalCount: number;
                        readonly nodes: ReadonlyArray<({
                            readonly __typename: "StatusContext";
                            readonly avatarUrl: string | null;
                            readonly state: StatusState;
                            readonly targetUrl: string | null;
                            readonly description: string | null;
                        } | {
                            readonly __typename: "CheckRun";
                            readonly name: string;
                            readonly status: CheckStatusState;
                            readonly conclusion: CheckConclusionState | null;
                            readonly detailsUrl: string | null;
                        } | {
                            /*This will never be '%other', but we need some
                            value in case none of the concrete values match.*/
                            readonly __typename: "%other";
                        }) | null> | null;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "last",
  "value": 1
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v3 = [
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
      "name": "number",
      "storageKey": null
    },
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
      "args": null,
      "kind": "ScalarField",
      "name": "isDraft",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "login",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v1/*: any*/)
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
                  "kind": "ScalarField",
                  "name": "oid",
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
                    (v2/*: any*/),
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "first",
                          "value": 100
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
                        },
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": null,
                          "kind": "LinkedField",
                          "name": "nodes",
                          "plural": true,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "__typename",
                              "storageKey": null
                            },
                            {
                              "kind": "InlineFragment",
                              "selections": [
                                (v0/*: any*/),
                                (v2/*: any*/),
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "targetUrl",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "description",
                                  "storageKey": null
                                }
                              ],
                              "type": "StatusContext",
                              "abstractKey": null
                            },
                            {
                              "kind": "InlineFragment",
                              "selections": [
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "name",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "status",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "conclusion",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "detailsUrl",
                                  "storageKey": null
                                }
                              ],
                              "type": "CheckRun",
                              "abstractKey": null
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": "contexts(first:100)"
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
        (v1/*: any*/)
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
              "selections": (v3/*: any*/),
              "type": "IssueComment",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
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
(node as any).hash = 'f6c1c59f57d8a58de0572a15800b4298';
export default node;
