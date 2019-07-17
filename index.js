const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err, client) => {

  assert.equal(err, null);
  console.log('Connection Established!');
  const db = client.db(dbname);
  const collection = db.collection('dishes');
  collection.insertOne({"name": "Uthappizza2", "description": "test123"},
  (err, result) => {
    assert.equal(err, null);
    console.log('Data added successfully!')
    console.log('After insert:\n');
    console.log(result.ops);
    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);
      console.log('Found: \n');
      console.log(docs);
      db.dropCollection('dishes');
    });
  });

});
