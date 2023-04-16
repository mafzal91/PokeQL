import "dotenv/config.js";
import express from "express";
import graphqlHTTP from "express-graphql";
// import {buildSchema} from "graphql";
import {makeExecutableSchema} from "graphql-tools";
import config from "./configs/index.js";
import * as models from "./models/index.js";
import types from "./graphql/types.js";
import resolvers from "./graphql/resolvers.js";

const app = express();
const executableSchema = makeExecutableSchema({
  resolvers,
  typeDefs: types,
});

app.use("*", (req, res, next) => {
  console.log(`HOST ${req.headers.host} [${req.method}] ${req.originalUrl}`);
  next();
});
app.use("/heyo", (req, res) => {
  res.json({hello: "world"});
});
app.use(
  "/",
  graphqlHTTP(() => {
    return {
      // schema: buildSchema(types),
      context: models,
      graphiql: true,
      rootValue: resolvers,
      schema: executableSchema,
    };
  }),
);

app.listen(config.port, () => {
  console.log(
    `Running a GraphQL API server at localhost:${config.port}/graphql`,
  );
});
