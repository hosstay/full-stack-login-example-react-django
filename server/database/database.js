const {MongoClient} = require('mongodb');

class Database {
  constructor() {
    this.uri = 'mongodb://db/';  
    this.client;
  }

  async getCollection(collection) {
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    const database = this.client.db('test_website');

    return database.collection(collection);
  }

  async close() {
    await this.client.close();
  }


}

module.exports = Database;