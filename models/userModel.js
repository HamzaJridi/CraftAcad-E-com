//the User Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//The User mongoose Schema
var User = new Schema({
  firstname : {type : String, required : true },
  lastname : {type : String, required : true },
  username : {type : String, unique : true, required : true },
  password : {type : String, required : true },
  cart : [String]

});

//exportis the User model
module.exports = mongoose.model('User', User);