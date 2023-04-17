import mongo from "mongoose";
import config from "../configs/index.js";

function generateMongoDBConnectionString({
  database,
  host,
  replSet,
  username,
  password,
}) {
  const url = new URL(
    `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(
      password,
    )}@${encodeURIComponent(host)}/${encodeURIComponent(
      database,
    )}?retryWrites=true&w=majority`,
  );
  if (replSet) {
    url.searchParams.set("replicaSet", encodeURIComponent(replSet));
  }
  return url.toString();
}

const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectionURL = generateMongoDBConnectionString({
  database: config.mongodb.database,
  host: config.mongodb.host,
  password: config.mongodb.password,
  port: config.mongodb.port,
  replSet: config.mongodb.replSet,
  username: config.mongodb.user,
});
console.log(config.mongodb);
mongo.set("debug", config.mongodb.debug);
mongo.connect(connectionURL, options).then(
  () => {
    console.log("Connected");
  },
  (err) => {
    console.log(err);
  },
);

export default mongo;
