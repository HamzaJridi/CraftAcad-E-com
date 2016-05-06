var express = require('express');

var routes = function(Product){
  var productRouter = express.Router();
  /** set the product route using productRouter.route('newRoute') method*/
  productRouter.route('/')
    //the post methode require the bodyParser
    .post(function(req,res){
      var product = new Product(req.body);
      product.save();
      res.status(201).send(product);
    })
    .get(function(req,res){
      console.log('I got a GET Request')
      Product.find(function (err,products) {
        if(err){console.log(err)};

        res.json(products);
      });
    });
  //
  ///** create a Middleware to get the bookId and use it
  // * in get,put and patch requests for a single book */
  //
  //bookRouter.use('/:bookId',function(req,res,next){
  //  /** getting a single book item by its Id */
  //    //get the id passed in the url using req.params
  //  Book.findById(req.params.bookId, function(err,book){
  //    if(err){
  //      res.status(500).send(err);
  //    } else if (book){
  //      req.book = book;
  //      next();
  //    } else {
  //      res.status(404).send('Book not found');
  //    }
  //  });
  //});
  //
  //bookRouter.route('/:bookId')
  //  //get a specific item by its id and display it
  //  .get(function(req,res){
  //    //req.book = book in the middleware
  //    res.json(req.book);
  //  })
  //  //get a specific item by its id to update it
  //  .put(function(req,res){
  //    /** getting a single book item by its Id */
  //    //get the id passed in the url using req.params
  //    /**replace the book properties with what has
  //     * come back from the req using req.body*/
  //    req.book.title = req.body.title;
  //    req.book.author = req.body.author;
  //    req.book.genre = req.body.genre;
  //    req.book.read = req.body.read;
  //    //save changes in the db
  //    req.book.save(function(err){
  //      if(err){
  //        res.status(500).send(err);
  //      } else {
  //        res.json(req.book);
  //      }
  //    });
  //    //send back book to display it as a json frmt
  //  })
  //
  //  .patch(function(req,res){
  //    if (req.body._id) {
  //      delete req.body._id;
  //    }
  //    for (var p in req.body) {
  //      req.book[p] = req.body[p];
  //    }
  //    req.book.save(function(err){
  //      if(err){
  //        res.status(500).send(err);
  //      } else {
  //        res.json(req.book);
  //      }
  //    });
  //  })
  //
  //  .delete(function(req,res){
  //    req.book.remove(function(err){
  //      if(err) {
  //        res.status(500).send(err);
  //      }
  //      else{
  //        res.status(204).send('Removed');
  //      }
  //    });
  //  });

  return productRouter
};

module.exports = routes;