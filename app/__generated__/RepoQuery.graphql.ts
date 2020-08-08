/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RepoQueryVariables = {
    name: string;
    owner: string;
};
export type RepoQueryResponse = {
    readonly repository: {
        readonly url: string;
        readonly releases: {
            readonly nodes: ReadonlyArray<{
                readonly publishedAt: string | null;
                readonly description: string | null;
                readonly url: string;
                readonly tagName: string;
            } | null> | null;
        };
        readonly pullRequests: {
            readonly totalCount: number;
            readonly nodes: ReadonlyArray<{
                readonly " $fragmentRefs": FragmentRefs<"PullRequest_pr">;
            } | null> | null;
        };
    } | null;
};
export type RepoQuery = {
    readonly response: RepoQueryResponse;
    readonly variables: RepoQueryVariables;
};



/*
query RepoQuery(
  $name: String!
  $owner: String!
) {
  repository(name: $name, owner: $owner) {
    url
    releases(last: 1) {
      nodes {
        publishedAt
        description
        url
        tagName
        id
      }
    }
    pullRequests(states: OPEN, first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        ...PullRequest_pr
        id
      }
    }
    id
  }
}

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
          id
        }
        id
      }
      id
    }
  }
  timelineItems(itemTypes: [ISSUE_COMMENT, PULL_REQUEST_REVIEW], last: 1) {
    nodes {
      __typename
      ... on IssueComment {
        updatedAt
      }
      ... on PullRequestReview {
        updatedAt
      }
      ... on Node {
        __isNode: __typename
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "owner"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "last",
  "value": 1
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "publishedAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tagName",
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v9 = [
  (v8/*: any*/),
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "UPDATED_AT"
    }
  },
  {
    "kind": "Literal",
    "name": "states",
    "value": "OPEN"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "updatedAt",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RepoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "ReleaseConnection",
            "kind": "LinkedField",
            "name": "releases",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Release",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v2/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "releases(last:1)"
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "PullRequestConnection",
            "kind": "LinkedField",
            "name": "pullRequests",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PullRequest",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PullRequest_pr"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "pullRequests(first:10,orderBy:{\"direction\":\"DESC\",\"field\":\"UPDATED_AT\"},states:\"OPEN\")"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RepoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "ReleaseConnection",
            "kind": "LinkedField",
            "name": "releases",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Release",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v2/*: any*/),
                  (v7/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "releases(last:1)"
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "PullRequestConnection",
            "kind": "LinkedField",
            "name": "pullRequests",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PullRequest",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": (v4/*: any*/),
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
                                      (v8/*: any*/)
                                    ],
                                    "concreteType": "StatusCheckRollupContextConnection",
                                    "kind": "LinkedField",
                                    "name": "contexts",
                                    "plural": false,
                                    "selections": [
                                      (v10/*: any*/)
                                    ],
                                    "storageKey": "contexts(first:10)"
                                  },
                                  (v11/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v11/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v11/*: any*/)
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
                      (v3/*: any*/)
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
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v12/*: any*/),
                            "type": "IssueComment",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v12/*: any*/),
                            "type": "PullRequestReview",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "timelineItems(itemTypes:[\"ISSUE_COMMENT\",\"PULL_REQUEST_REVIEW\"],last:1)"
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "pullRequests(first:10,orderBy:{\"direction\":\"DESC\",\"field\":\"UPDATED_AT\"},states:\"OPEN\")"
          },
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4189f46b38e055fb5d88c028ad867684",
    "id": null,
    "metadata": {},
    "name": "RepoQuery",
    "operationKind": "query",
    "text": "query RepoQuery(\n  $name: String!\n  $owner: String!\n) {\n  repository(name: $name, owner: $owner) {\n    url\n    releases(last: 1) {\n      nodes {\n        publishedAt\n        description\n        url\n        tagName\n        id\n      }\n    }\n    pullRequests(states: OPEN, first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {\n      totalCount\n      nodes {\n        ...PullRequest_pr\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment PullRequest_pr on PullRequest {\n  title\n  mergeable\n  viewerDidAuthor\n  reviewDecision\n  url\n  commits(last: 1) {\n    nodes {\n      commit {\n        pushedDate\n        statusCheckRollup {\n          state\n          contexts(first: 10) {\n            totalCount\n          }\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n  timelineItems(itemTypes: [ISSUE_COMMENT, PULL_REQUEST_REVIEW], last: 1) {\n    nodes {\n      __typename\n      ... on IssueComment {\n        updatedAt\n      }\n      ... on PullRequestReview {\n        updatedAt\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5247e1acb1f4f39107e30bb2b1e90bb8';
export default node;
