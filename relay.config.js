module.exports = {
  src: './app',
  schema: './node_modules/@octokit/graphql-schema/schema.graphql',
  extensions: ['ts', 'tsx'],
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  language: 'typescript',
  customScalars: {
    URI: 'String',
    DateTime: 'String',
    GitObjectID: 'String',
  },
};
