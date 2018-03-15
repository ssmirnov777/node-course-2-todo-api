var mongoose = require ('mongoose');

mongoose.Promise = global.Promise;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'
console.log("MOngo connected to the server ", uri)
mongoose.connect (uri);

module.exports = {
  mongoose
}
