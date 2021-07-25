export default (env = process.env) => ({
  mongodb: {
    database: env.MONGO_DATABASE,
    debug: true,
    host: env.MONGO_HOST,
    password: env.MONGO_PASSWORD,
    port: env.MONGO_PORT,
    user: env.MONGO_USERNAME,
  },
  port: 3001,
});
