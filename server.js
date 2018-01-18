var config = require('./config')
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var app = express();

var types = require('./graphql/types')
var resolvers = require('./graphql/resolvers')

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(types),
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(3001);
console.log('Running a GraphQL API server at localhost:4000/graphql');
