const { ObjectId } = require("mongodb");
var config = require("../config/setting.json");
class StudentService {
  databaseConnection = require("../database/database");
  student = require("../model/student");
  client;
  productDatabase;
  productCollection;
  constructor() {
    this.client =  this.databaseConnection.getMongoClient();
    this.client.connect();
    this.productDatabase = this.client.db("ktlan2");
    this.productCollection = this.productDatabase.collection("Student");
  }
  async deleteStudent(id) {
    return await this.productCollection.deleteOne({ _id: new ObjectId(id) });
  }
  async updateStudent(product) {
    return await this.productCollection.updateOne(
      { _id: new ObjectId(product._id) },
      { $set: product }
    );
  }
  async insertStudent(product) {
    return await this.productCollection.insertOne(product);
  }
  async getStudent(id) {
    return await this.productCollection.findOne({ _id: new ObjectId(id) }, {});
  }
  async getStudentList() {
    const cursor = await this.productCollection.find({}, {}).skip(0).limit(100);
    return await cursor.toArray();
  }
}
module.exports = StudentService;
