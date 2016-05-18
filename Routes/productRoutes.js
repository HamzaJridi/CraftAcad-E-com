var express = require('express');

var routes = function(Product){
  var productRouter = express.Router();
  /** set the product route using productRouter.route('newRoute') method*/
  productRouter.route('/')
    //the post method require the bodyParser
    .post(function(req,res){
      var product = new Product(req.body);
      product.save();
      res.status(201).send(product);
    })
    .get(function(req,res){
      console.log('I got a GET Request');
      Product.find(function (err,products) {
        if(err){console.log(err)}

        res.json(products);
      });
    });

//Get prods by category
  productRouter.route('/category/:category')
    .get(function(req,res){
      console.log('I got a GET Request');
      var category = req.params.category;
      Product.find({"category" : category},function (err,products) {
        if(err){console.log(err)}

        res.json(products);
      });
    });
  //
  /** create a Middleware to get the productId and use it
   * in get and put requests for a single product */

  productRouter.use('/:productId',function(req,res,next){
    /** getting a single product item by its Id */
      //get the id passed in the url using req.params
    Product.findById(req.params.productId, function(err,product){
      if(err){
        res.status(500).send(err);
      } else if (product){
        req.product = product;
        next();
      } else {
        res.status(404).send('Product not found');
      }
    });
  });

  productRouter.route('/:productId')
    //get a specific item by its id and display it
    .get(function(req,res){
      //req.product = product in the middleware
      res.json(req.product);
    })

    //get a specific item by its id to update it
    .put(function(req,res){
      /** getting a single product item by its Id */
      //get the id passed in the url using req.params
      /**replace the product properties with what has
       * come back from the req using req.body*/
      req.product.title = req.body.title;
      req.product.imgUrl = req.body.imgUrl;
      req.product.price = req.body.price;
      req.product.quantity = req.body.quantity;
      req.product.ref = req.body.ref;
      req.product.category = req.body.category;
      //save changes in the db
      req.product.save(function(err){
        if(err){
          res.status(500).send(err);
        } else {
          //send back product to display it as a json frmt
          res.json(req.product);
        }
      });

    })

    .delete(function(req,res){
      req.product.remove(function(err){
        if(err) {
          res.status(500).send(err);
        }
        else{
          res.status(204).send('Removed');
        }
      });
    });


  // add the Res infos (prodId,userId, date) into the Prod collection
  productRouter.post('/:prodId/reservation/:username/date/:dateRes',
    function(req,res){
      var prodId= req.params.prodId;
      var username=req.params.username;
      var dateRes= req.params.dateRes;

      Product.update({_id:prodId},
        { $push:{listReser:{prodId:prodId,username:username,
          dateRes:dateRes}}
        },
        function (err,data) {
          if (err) { console.log(err); }
          else { res.json(data); }
        });
    });

  return productRouter
};

module.exports = routes;