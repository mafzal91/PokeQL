import "dotenv/config.js";
import express from "express";
import {createYoga, createSchema} from "graphql-yoga";

import config from "./configs/index.js";
import * as models from "./models/index.js";
import types from "./graphql/types.js";
import resolvers from "./graphql/resolvers.js";

const app = express();
const graphQLServer = createYoga({
  context: {
    models,
  },
  graphiql: {
    defaultQuery:
      /* GraphQL */
      `
        query {
          Pokemons(skip: 0, limit: 10) {
            name
          }
        }
      `,
  },
  schema: createSchema({
    resolvers,
    typeDefs: types,
  }),
});

app.use("*", (req, res, next) => {
  console.log(`HOST ${req.headers.host} [${req.method}] ${req.originalUrl}`);
  next();
});
app.use("/heyo", (req, res) => {
  res.json({hello: "world"});
});
app.use("/", graphQLServer);

app.listen(config.port, () => {
  console.log(
    `Running a GraphQL API server at localhost:${config.port}/graphql`,
  );
});
