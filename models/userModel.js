//the User Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* "passportLocalMongoose" a Mongoose plugin that simplifies building username
 and password login with Passport */
var passportLocalMongoose = require('passport-local-mongoose');

//The User mongoose Schema
var User = new Schema({
  firstname : {type : String },
  lastname : {type : String },
  username : {type : String, unique : true },
  role : { type:String , default : "customer"},
  password : {type : String },
  cart : [String]

});

// Passport Local Mongoose
User.plugin(passportLocalMongoose);

//exportis the User model
module.exports = mongoose.model('User', User);
