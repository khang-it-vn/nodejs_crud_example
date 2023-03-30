const { ObjectId } = require("mongodb");
var config = require("../config/setting.json");
class ContactService {
  databaseConnection = require("../database/database");
  product = require("../model/contact");
  client;
  productDatabase;
  productCollection;
  constructor() {
    this.client =  this.databaseConnection.getMongoClient();
    this.client.connect();
    this.productDatabase = this.client.db("ktlan2");
    this.productCollection = this.productDatabase.collection("Contact");
  }
  async deleteProduct(id) {
    return await this.productCollection.deleteOne({ _id: new ObjectId(id) });
  }
  async updateProduct(product) {
    return await this.productCollection.updateOne(
      { _id: new ObjectId(product._id) },
      { $set: product }
    );
  }
  async insertProduct(product) {
    return await this.productCollection.insertOne(product);
  }
  async getProduct(id) {
    return await this.productCollection.findOne({ _id: new ObjectId(id) }, {});
  }
  async getProductList() {
    const cursor = await this.productCollection.find({}, {}).skip(0).limit(100);
    return await cursor.toArray();
  }
}
module.exports = ContactService;
