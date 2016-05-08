var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/** open a connection to the db which is 'ecommerce'
 *  if the ecommerce db doesn't exist it'll be created */
var db = mongoose.connect('mongodb://localhost/ecommerce');

var Product = require('./models/productModel');

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/** bookRouter is returned from the routes() method in
 * the bookRoutes.js file */
productRouter = require('./Routes/productRoutes')(Product);



/** when you're in the '/products' the productRouter will handle it*/
app.use('/products', productRouter);

app.use(express.static(__dirname));
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

//app.get('/', function(req, res){
//  res.send('Welcome to my API')
//});

app.listen(port, function(){
  console.log('Gulp is running the app on port ' + port);
});