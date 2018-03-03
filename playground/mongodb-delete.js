//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to mongodb server: ", err.message);
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({'text':'Eat lunch'}).then((result) => {
  //   console.log(result);
  //});
  // deleteONe
  // db.collection('Todos').deleteOne({'text':'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({'text':'Eat lunch'}).then((result) => {
     console.log(result);
  });
  db.close();
});
