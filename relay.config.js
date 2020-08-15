module.exports = {
  src: './app',
  schema: './github.schema.graphql',
  extensions: ['ts', 'tsx'],
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  language: 'typescript',
  customScalars: {
    URI: 'String',
    DateTime: 'String',
    GitObjectID: 'String',
  },
};
