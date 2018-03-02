//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to mongodb server: ", err.message);
  }
  console.log('Connected to MongoDB server');

  // db.collection ('Todos').insertOne({
  //     text: 'something to do',
  //     completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Error during the insert:", err.message );
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection ('User').insertOne({
  //   name: "Sergey",
  //   age: 51,
  //   location: 'Concord, CA'
  // }, (err, result) => {
  //   if (err) {
  //     return concole.log('Unable to insert: ', err.message);
  //   }
  //   console.log(JSON.stringify (result.ops, undefined, 2));
  // });



  db.close();
});
