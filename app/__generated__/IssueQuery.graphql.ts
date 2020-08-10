/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type IssueQueryVariables = {
    repoName: string;
    repoOwner: string;
    issue: number;
};
export type IssueQueryResponse = {
    readonly repository: {
        readonly issue: {
            readonly url: string;
            readonly title: string;
            readonly updatedAt: string;
            readonly closed: boolean;
            readonly comments: {
                readonly totalCount: number;
                readonly nodes: ReadonlyArray<{
                    readonly bodyText: string;
                    readonly updatedAt: string;
                    readonly author: {
                        readonly avatarUrl: string;
                        readonly url: string;
                        readonly login: string;
                    } | null;
                } | null> | null;
            };
        } | null;
    } | null;
};
export type IssueQuery = {
    readonly response: IssueQueryResponse;
    readonly variables: IssueQueryVariables;
};



/*
query IssueQuery(
  $repoName: String!
  $repoOwner: String!
  $issue: Int!
) {
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
            __typename
            avatarUrl
            url
            login
            ... on Node {
              __isNode: __typename
              id
            }
          }
          id
        }
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "issue"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repoName"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repoOwner"
},
v3 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "repoName"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "repoOwner"
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "number",
    "variableName": "issue"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "closed",
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
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
  "name": "bodyText",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "Issue",
            "kind": "LinkedField",
            "name": "issue",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": (v9/*: any*/),
                "concreteType": "IssueCommentConnection",
                "kind": "LinkedField",
                "name": "comments",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IssueComment",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "author",
                        "plural": false,
                        "selections": [
                          (v12/*: any*/),
                          (v5/*: any*/),
                          (v13/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "comments(last:1)"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "IssueQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "Issue",
            "kind": "LinkedField",
            "name": "issue",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": (v9/*: any*/),
                "concreteType": "IssueCommentConnection",
                "kind": "LinkedField",
                "name": "comments",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IssueComment",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "author",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          },
                          (v12/*: any*/),
                          (v5/*: any*/),
                          (v13/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v14/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "comments(last:1)"
              },
              (v14/*: any*/)
            ],
            "storageKey": null
          },
          (v14/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9c87d546146d83e24b4f828c3e1b9424",
    "id": null,
    "metadata": {},
    "name": "IssueQuery",
    "operationKind": "query",
    "text": "query IssueQuery(\n  $repoName: String!\n  $repoOwner: String!\n  $issue: Int!\n) {\n  repository(name: $repoName, owner: $repoOwner) {\n    issue(number: $issue) {\n      url\n      title\n      updatedAt\n      closed\n      comments(last: 1) {\n        totalCount\n        nodes {\n          bodyText\n          updatedAt\n          author {\n            __typename\n            avatarUrl\n            url\n            login\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e5ae2a7ab866d4b3810c8fc843121d0a';
export default node;
