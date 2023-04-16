export default (env = process.env) => {
  return {
    mongodb: {
      database: env.MONGO_DATABASE,
      debug: true,
      host: env.MONGO_HOST,
      password: env.MONGO_PASSWORD,
      port: env.MONGO_PORT,
      replSet: env.MONGO_REPL_SET,
      user: env.MONGO_USERNAME,
    },
    port: 3003,
  };
};
