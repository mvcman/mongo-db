const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err, client) => {

  assert.equal(err, null);
  console.log('Connection Established!');
  const db = client.db(dbname);

  dboper.insertDocument(db, { name: "vadonut", description: 'Test'}, 'dishes', (result) => {
    console.log('Insert Document:\n', result.ops);

    dboper.findDocuments(db, 'dishes', (docs) => {
      console.log('found documents:\n', docs);
      dboper.updateDocument(db, {name: "vadonut"}, { description: "updatesd test"}, 'dishes', (result) => {
        console.log('Updated Documents:\n', result.result);
        dboper.findDocuments(db, 'dishes', (docs) => {
          console.log('found documents:\n', docs);
          db.dropCollection('dishes', (result) => {
            console.log('Dropped Collection:', result);
            client.close();
          });
        });
      });
    });
  });
});
