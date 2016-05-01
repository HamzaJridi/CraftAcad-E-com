var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/ecommerce');
var Article = require('./models/articleModel');

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

articleRouter = require('./routes/articleRoutes')(Article);
app.use('/articles', articleRouter);

app.get('/', function(req, res){
    res.send('Welcome to my E-commerce')
});

app.listen(port, function(){
    console.log('Gulp is running the app on port ' + port);
});