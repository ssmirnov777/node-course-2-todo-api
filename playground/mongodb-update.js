//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to mongodb server: ", err.message);
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate(
  //   {_id: new ObjectID("5a998b1317e7283806ff5ddd")},
  //   {$set: {completed: true}},
  //   {returnOriginal: false}
  // ).then( (result) => {
  //   console.log(result);
  // });
  //5a998d09feb24338645f98e5
  // db.collection('User').findOneAndUpdate (
  //   { _id: new ObjectID('5a998d09feb24338645f98e5')},
  //   {$set: {name: 'Sergey'}, $inc: {age: 1}},
  //   {returnOriginal: false}
  // ).then ((result) => {
  //   console.log(result);
  // });

  //db.close();
});
