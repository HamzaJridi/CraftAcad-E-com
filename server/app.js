var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');


var db = mongoose.connect('mongodb://localhost/ecommerce');
var Article = require('./models/articleModel');

var app = express();
var port = process.env.PORT || 3000;

//app.use(express.static(__dirname + "../client"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


articleRouter = require('./routes/articleRoutes')(Article);
app.use('/articles', articleRouter);

/*app.get('/', function(req, res){
    res.send('Welcome to my E-commerce')
});*/


app.use(express.static(__dirname));
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});


app.listen(port, function(){
    console.log('Gulp is running the app on port ' + port);
});