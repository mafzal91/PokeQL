import mongo from "mongoose";
import config from "../configs/index.js";

const options = {
  auth: {authSource: "admin"},
  pass: config.mongodb.password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: config.mongodb.user,
};
mongo.set("debug", config.mongodb.debug);

const connectionURL = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
mongo.connect(connectionURL, options).then(
  () => {
    console.log("Connected");
  },
  (err) => {
    console.log(err);
  },
);

export default mongo;
