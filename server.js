
// Load the module dependencies
var mongoose = require('mongoose'),
  express = require('./express');
  /*passport = require('./config/passport');*/

// Create a new Mongoose connection instance
//var db = mongoose();
var db = mongoose.connect('mongodb://localhost/ecommerce');

// Create a new Express application instance
var app = express();

// Configure the Passport middleware
//var passport = passport();

// Use the Express application instance to listen to the '3000' port
var port = process.env.PORT || 3000;

// Log the server status to the console
app.listen(port, function(){
  console.log('Gulp is running the app on port ' + port);
});

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;