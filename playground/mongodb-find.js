//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to mongodb server: ", err.message);
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({completed: true}).toArray().then ( (docs) => {
  //   console.log(docs);
  // }, (err) => {
  //   return Console.log("Unable to find:", err.message);
  // });
  db.collection('Todos').count({completed: true}).then ((count) => {
    console.log(`Count: ${count}`);
  })


  db.close();
});
