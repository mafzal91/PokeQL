import mongoose from "mongoose";
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
    )}@${encodeURIComponent(host)}/${encodeURIComponent(database)}`,
  );

  url.searchParams.set("retryWrites", true);
  url.searchParams.set("w", "majority");

  if (replSet) {
    url.searchParams.set("replicaSet", encodeURIComponent(replSet));
  }
  return url.toString();
}

const options = {
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

mongoose.set("debug", config.mongodb.debug);

mongoose.connect(connectionURL, options).then(
  () => {
    console.log("Connected");
  },
  (err) => {
    console.log(err);
  },
);

// Get the default connection object
const db = mongoose.connection;
// Listen to the connection events
db.on("connected", function () {
  console.log("Mongoose connected to the database");
});

db.on("error", function (err) {
  console.error("Mongoose connection error:", err);
});

db.on("disconnected", function () {
  console.log("Mongoose disconnected from the database");
});

export default mongoose;
