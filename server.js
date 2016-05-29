var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var hash = require('bcrypt-nodejs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var localStrategy = require('passport-local' ).Strategy;
/** open a connection to the db which is 'E-com'
 *  if the E-com db doesn't exist it'll be created */
//mongoose.connect('mongodb://localhost/E-com');

 //to work with the remote db use this uri
var uri = 'mongodb://hamza:hamza@ds025742.mlab.com:25742/e-commerce';
mongoose.connect(uri);

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

/** productRouter is returned from the routes() method in
 * the productRoutes.js file */
/** when you're in the '/products' the productRouter will handle it*/
var Product = require('./models/productModel');
productRouter = require('./Routes/productRoutes')(Product);
app.use('/products', productRouter);

/* The User model Schema and the route handler for the '/users' Route*/
var User = require('./models/userModel');
userRouter = require('./Routes/userRoutes')(User);
app.use('/users', userRouter);

/* The Admin model Schema and the route handler for the '/admins' Route*/
var Admin = require('./models/userModel');
adminRouter = require('./Routes/adminRoutes')(Admin);
app.use('/admins', adminRouter);

/* The Event model Schema and the route handler for the '/events' Route*/
var Event = require('./models/eventModel');
eventRouter = require('./Routes/eventRoutes')(Event);
app.use('/events', eventRouter);

app.use(logger('dev'));

// Passport Configuration
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname));
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});


app.get('/', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});
//app.get('/', function(req, res){
//  res.send('Welcome to my API')
//});

app.listen(port, function(){
  console.log('Gulp is running the app on port ' + port);
});