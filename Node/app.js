var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var passport = require('passport');
var path = require('path');
var localStrategy = require('passport-local' ).Strategy;

var app = express();

//add Middleware necessary for the REST API's
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

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