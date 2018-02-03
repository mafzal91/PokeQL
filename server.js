var config = require('./config')
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var { makeExecutableSchema } = require('graphql-tools');
var app = express();

var models = require('./models')
var types = require('./graphql/types')
var resolvers = require('./graphql/resolvers')
// console.log(models)

const executableSchema = makeExecutableSchema({
  typeDefs: types,
  resolvers
});

app.use('/', graphqlHTTP(req => {
  return {
    // schema: buildSchema(types),
    schema: executableSchema,
    rootValue: resolvers,
    graphiql: true,
    context: models,

  }
}));

app.listen(config.port);
console.log(`Running a GraphQL API server at localhost:${config.port}/graphql`);
