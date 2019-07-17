const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, {useNewUrlParser: true})
.then((client) => {

  // assert.equal(err, null);
  console.log('Connection Established!');
  const db = client.db(dbname);

  dboper.insertDocument(db, { name: "vadonut", description: 'Test'}, 'dishes')
  .then((result) => {
    console.log('Insert Document:\n', result.ops);
    return dboper.findDocuments(db, 'dishes');
})
  .then((docs) => {
      console.log('found documents:\n', docs);
      return dboper.updateDocument(db, {name: "vadonut"}, { description: "updatesd test"}, 'dishes')
    })
  .then((result) => {
        console.log('Updated Documents:\n', result.result);
        return dboper.findDocuments(db, 'dishes')
      })
      .then((docs) => {
          console.log('found documents:\n', docs);
          return db.dropCollection('dishes')
        })
        .then((result) => {
            console.log('Dropped Collection:', result);
            return client.close();
          })
          .catch((err) => {
            console.log(err);
          });
})
.catch((err) => console.log(err));
