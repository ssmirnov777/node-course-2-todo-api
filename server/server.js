const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require ('./db/mongoose');
const {Todo}  = require ('./models/todo');
const {User}  = require ('./models/user');
const {ObjectID} = require('mongodb');


const app = express();

app.use (bodyParser.json());
const port = process.env.PORT || 3000;

app.post ("/todos", (req, res) => {
  var todo = new Todo ({
    text: req.body.text
  });

  todo.save().then ((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get ("/todos/:id", (req,res) => {
  id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  } else {
      Todo.findById(id).then((todo) => {
      if (!todo) {
          return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send({});
    });
  }

});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
})

module.exports = {app}
