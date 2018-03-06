const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server/server');
const {Todo} = require('./../server/models/todo');

const todos = [
  {text:'first todo record'},
  {text: 'second todo record'}

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

describe ("GET /totos", () => {
  it ("get list of todos", (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      }).end(done);
  })
});
