const { use } = require("../controllers");
var config = require("../config/setting.json");
class DatabaseConnection {
  url;
  constructor() {}
  static getMongoClient() {
 this.url = "mongodb://localhost:27017/";
    const {MongoClient} = require("mongodb");
    const client = new MongoClient(this.url);
    return client;
  }
}
module.exports = DatabaseConnection;
