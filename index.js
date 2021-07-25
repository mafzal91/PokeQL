// // Set options as a parameter, environment variable, or rc file.
// require = require("esm")(module /*, options*/);
import {readFileSync} from "fs";
import dotenv from "dotenv";
import path from "path";

const {NODE_ENV: env} = process.env;

if (!env) {
  process.env.NODE_ENV = "development";
}

dotenv.config({path: path.resolve(__dirname, ".env")});

const envFile = ["local", "test"].includes(env) ? "" : `.${env}`;
if (!envFile) {
  const envConfig = dotenv.parse(
    readFileSync(path.resolve(__dirname, `.env${envFile}`)),
  );
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}
import "./server.js";
