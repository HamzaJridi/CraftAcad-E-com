var express = require('express');
var passport = require('passport');
var User = require('../models/userModel');
var Product = require('../models/productModel');

var routes = function(User){
  var userRouter = express.Router();

  //Register method
  userRouter.post('/register', function(req, res) {
    User.register (new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username
      }),
      req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
  });

  //the login method
  userRouter.post('/login', function(req,res,next){
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      //logging in the user depending on its status
      req.logIn(user, function(err) {
        if(err){
          return res.status(500).json({
            err: 'Could not log in user'
          });
        }
        req.session.user=user;
        res.status(200).json({
          status : 'Login Successful!!'
        });
      });
    })(req,res,next);//passport.authenticate method
  });//router.post method

//The logOut method
  userRouter.get('/logout', function(req, res) {
    req.logout();
    req.session.user=null;
    res.redirect('/');
    res.status(200).json({
      status: 'User Logged Out..Bye!!'
    });

  });

  userRouter.get('/session',function(req,res){
    console.log(req.session.user);
    if(!req.session.user){
      return res.status(404).send("session not found");
    }
    return res.json(req.session.user);
  });
  userRouter.get('/:id', function(req, res) {
    User.id=req.params.id;
    User.find({_id:User.id},function(err,data){
      if(err)
        res.status(500).send(err);
      else{
        res.json(data);
      }

    });
  });


  //persist the user session after refresh
  userRouter.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
      return res.status(200).json({
        status: false,
        administrator : false
      });
    }
    if (req.isAuthenticated() && req.role !=="admin") {
      return res.status(200).json({
        status: true,
        administrator : false
      });
    }
    if (req.isAuthenticated() && req.role ==="admin") {
      return res.status(200).json({
        status: true,
        administrator : true
      });
    }
    //res.status(200).json({
    //  status: true
    //});
  });


  // add product in shopping cart
  userRouter.get('/:id/cart/:productId/:title/:imgUrl/:price/:quantity/:qte',
    function(req,res){
      var productId= req.params.productId;
      var title= req.params.title;
      var imgUrl= req.params.imgUrl;
      var price= req.params.price;
      var quantity= req.params.quantity;
      var qte= req.params.qte;
      var totalPrice = qte * price;
      var userId=req.params.id;
      console.log("adding product...");
      User.update({_id:userId},{$push:
        {cart:{
          productId:productId,
          title:title,
          imgUrl:imgUrl,
          price:price,
          quantity:quantity,
          qte:qte,
          totalPrice : totalPrice
        }}}
        ,function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("product added successfully");
          }
        });
    });

// delete product from shopping cart
  userRouter.delete('/:id/cart/:productId',function(req, res){
    User.id=req.params.id;
    productId=req.params.productId;

    User.update({_id:User.id},{$pull:{cart:{productId:productId}}},function(err){
      if(err)
        res.status(500).send(err);
      else
        console.log("cart updated");
      res.status(204).send('Removed');
    });
  });

  //insert ordered prods into the user's purchased prods list
  userRouter.get('/:id/purchased/:productId/:title/:price/:qte/:totalPrice/:imgUrl',
    function(req,res){
      var productId= req.params.productId;
      var title= req.params.title;
      var imgUrl= req.params.imgUrl;
      var price= req.params.price;
      var qte= req.params.qte;
      var totalPrice = qte * price;
      var userId=req.params.id;
      console.log("adding product...");
      User.update({_id:userId},{$push:
        {purchasedProds:{
          productId:productId,
          title:title,
          imgUrl:imgUrl,
          price:price,
          qte:qte,
          totalPrice : totalPrice
        }}}
        ,function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("product purchased successfully");
          }
        });
      User.update({_id:User.id},{$pull:{cart:{$exists: true}}},function(err){
        if(err)
          res.status(500).send(err);
        else
          res.status(204).send('shopCart cleared');
      });
    });

  // The Users CRUD API
  userRouter.route('/')
    //Add a user
    .post(function(req,res){
      var user = new User(req.body);
      user.save();
      res.status(201).send(user);
    })
    // get all users
    .get(function(req,res){
      console.log('I got a GET Request');
      User.find(function (err,users) {
        if(err){console.log(err)}

        res.json(users);
      });
    });

// Get a user by its ID
  userRouter.route('/:id')
    .get(function(req, res){
      res.json(req.user);
    })
    // Update a user
    .put(function(req, res){
      User.id=req.params.id;

      User.findOneAndUpdate({_id:User.id},
        {
          $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            statut :req.body.role,
            cart:req.body.cart
          }
        },
        function(err){
          if(err)
            res.status(500).send(err);
          else{
            res.json(req.user);
          }
        });
    })
    // Delete a User
    .delete(function(req, res){
      User.id=req.params.id;
      console.log(req.User);
      User.findOneAndRemove({_id:User.id},function(err){
        if(err)
          res.status(500).send(err);
        else
          res.status(204).send('Removed');
      });
    });


  return userRouter
};

module.exports = routes;