// Idk how to fix eslint Top level await error without using babel.
// So ignoring eslint rules for this file for now
import {readFile} from "fs/promises";
import dotenv from "dotenv";
import path from "path";

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}
const {NODE_ENV: env} = process.env;

dotenv.config({path: path.resolve(".env")});

const envFile = ["development"].includes(env) ? "" : `.${env}`;
if (!envFile) {
  const envConfig = dotenv.parse(
    await readFile(path.resolve(`.env${envFile}`)),
  );

  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

await import("./server.js");
