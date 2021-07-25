import mongoose from "mongoose";
import qs from "qs";
import config from "../configs/index.js";

const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
  mongodb: {user, password, host, port, database, debug, replicas, replicaSet},
} = config;

const {NODE_ENV, LEGACY_CONNECTION} = process.env;

let url = "";

switch (NODE_ENV) {
  case "development":
  case "production":
    if (LEGACY_CONNECTION) {
      const options = qs.stringify({
        authSource: "admin",
        replicaSet,
        retryWrites: true,
        ssl: true,
        w: "majority",
      });
      url = `mongodb://${user}:${password}@${replicas.join(
        ",",
      )}/${database}?${options}`;
    } else {
      const options = qs.stringify({
        retryWrites: true,
        w: "majority",
      });
      url = `mongodb+srv://${user}:${password}@${host}/${database}?${options}`;
    }
    break;
  default:
    url = `mongodb://${host}:${port}/${database}`;
}

mongoose.set("debug", debug);

mongoose.connect(url, options);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB on ${database}`);
});

mongoose.connection.on("error", (error) => {
  console.log(`Connection to MongoDB failed: ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("close", () => {
  console.log("MongoDB connection closed");
});

export default mongoose;
