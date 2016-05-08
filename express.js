// Load the module dependencies
 /*config = require('./config'),*/
var  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  //flash = require('connect-flash'),
  passport = require('passport');

// Define the Express configuration method
module.exports = function() {
  // Create a new Express application instance
  var app = express();

  var Product = require('./models/productModel');


  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());

  /** bookRouter is returned from the routes() method in
   * the bookRoutes.js file */
  productRouter = require('./Routes/productRoutes')(Product);

  /** when you're in the '/products' the productRouter will handle it*/
  app.use('/products', productRouter);

  // Configure the 'session' middleware
  //app.use(session({
  //  saveUninitialized: true,
  //  resave: true,
  //  secret: config.sessionSecret
  //}));

  // Set the application view engine and 'views' folder

  // Configure the flash messages middleware
  //app.use(flash());
  //
  //// Configure the Passport middleware
  //app.use(passport.initialize());
  //app.use(passport.session());

  //// Load the routing files
  //require('../app/routes/index.server.routes.js')(app);
  //require('../app/routes/users.server.routes.js')(app);

  app.use(express.static(__dirname));
  app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
  });

  //// Configure static file serving
  //app.use(express.static('./public'));

  // Return the Express application instance
  return app;
};