var config = require('./config')
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var app = express();

var models = require('./models')
var types = require('./graphql/types')
var resolvers = require('./graphql/resolvers')
// console.log(models)
app.use('/graphql', graphqlHTTP(req => {
  return {
    schema: buildSchema(types),
    rootValue: resolvers,
    graphiql: true,
    context: models,

  }
}));

app.listen(3001);
console.log('Running a GraphQL API server at localhost:3001/graphql');
