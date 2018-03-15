const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server/server');
const {Todo} = require('./../server/models/todo');

const todos = [
  {_id: new ObjectID(), text:'first todo record'},
  {_id: new ObjectID(), text: 'second todo record'}

];

beforeEach ((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
    done()
  });
});

describe ('POST /todos', () => {
  it ('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect ((res) => {
        expect(res.body.text).toBe(text);
      }).end ((err, res) => {
        if (err) {
          console.log("Errr", err);
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch ((e) => done(e));


      }) ;
  });
  it ('should not pass the test if body invalid', (done) => {
    var text = "";
    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end ((err,res) => {
        if (err) {return done(err);}
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch ((err) => {
          done(err);
        });

      });
  })
});

describe ("GET /todos", () => {
  it ("get list of todos", (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      }).end(done);
  })
});

describe ("GET /todos/:id", () => {
  it ("get todo by id", (done) => {
    request(app)
      .get (`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect (res => {
        expect (res.body.todo.text).toBe(todos[0].text)
      }).end(done)
  });

  it ("invalid id", (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done)
  });

  it ("unknown id", (done) => {
    const inv_id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${inv_id}`)
      .expect(404)
      .end(done)
  });

});
