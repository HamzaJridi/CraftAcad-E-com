var express = require('express');
var methodOverride = require('method-override');
var _ = require('lodash');
var debug = require('debug')('passport-mongo');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var session = require('express-session');

var app = express();


//requiring Routes
var routes = require('./routes/api.js');
// routes
app.use('/user', routes);

//define middlewares
//app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret:"bv2h85m4ff23fdc25023fp",resave:false,saveUninitialized:true}));

// CORS Support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce');
mongoose.connection.once('open', function(){
    //load all mongoose Models
    app.models = require ('./models/index');

    //Load the routes
    var routes = require('./routes');//routes.js
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });
});

var User = require('./models/user.js');
app.use(logger('dev'));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

//app.get('/', function(req, res){
//    res.send('Welcome to my API, The E-commerce Store')
//});


app.listen(port, function(){
    console.log('Gulp is running the app on port ' + port);
});