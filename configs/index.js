const env = process.env.NODE_ENV;
import development from "./development.js";
import production from "./production.js";

/**
 * Made this export self invoking function because I wanted to use a switch to set the config
 * (I may have more that two env in the future) and didn't want to reassign a variable.
 * With a function I can use a switch to return a value that gets exported
 *
 * Its double invoked because the returned value is a function itself and
 * I want to call it before exporting
 *
 * I made the config imports functions so if in the future I need to read env from elsewhere
 * (say not from dotenv) I can and pass that env into the config to be set.
 * (future proofing, may not be used)
 * */
export default (() => {
  switch (env) {
    case "production":
      return production;
    case "development":
    default:
      return development;
  }
})()();
