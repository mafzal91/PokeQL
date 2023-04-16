export default (env = process.env) => ({
  mongodb: {
    database: env.MONGO_DATABASE,
    debug: false,
    host: env.MONGO_HOST,
    password: env.MONGO_PASSWORD,
    port: env.MONGO_PORT,
    replSet: env.MONGO_REPL_SET,
    user: env.MONGO_USERNAME,
  },
  port: 3000,
});
