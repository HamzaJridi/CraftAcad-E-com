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
          status : 'Login Successful!!',
        });
      });
    })(req,res,next);//passport.authenticate method
  });//router.post method

//The logOut method
  userRouter.get('/logout', function(req, res) {
    req.logout();
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
    User.id=req.params.id
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
        status: false
      });
    }
    res.status(200).json({
      status: true
    });
  });




  // add product in CartShop
  userRouter.get('/:id/cart/:idproduct',function(req,res){
    var idproduct= req.params.idproduct;
    var iduser=req.params.id;
    console.log("aaaaa");
    User.update({_id:iduser},{$push:{cart:idproduct}},function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("sucess");
      }
    });
  })

// delete product from panier
  userRouter.delete('/:id/cart/:prodid',function(req, res){
    User.id=req.params.id;
    prodid=req.params.prodid;

    User.update({_id:User.id},{$pull:{cart:prodid}},function(err){
      if(err)
        res.status(500).send(err);
      else
        console.log("aaaa");
      res.status(204).send('Removed');
    });
  });

  // recuperer les produits d'un panier
  userRouter.get('/:id/cart',function(req, res){
    User.id=req.params.id;

    User.find({_id:User.id},{cart:[]},function(err){
      if(err)
        res.status(500).send(err);
      else
        console.log("aaaa");
      res.status(204).send('reup');
    });
  });

  //  Ajouter modifier supprimer un utilisateur
// recuperer tous les utilisateurs
  userRouter.get('/',function(req, res){
    var query = {};
    if(req.query.id){
      query.id = req.query.id;
    }
    User.find(query, function(err, users){
      if(err)
        res.status(500).send(err);
      else
        res.json(users);
    });
  });
  //definir le product router pour recuperer un seul produit à partir de la liste des produits
  userRouter.route('/:id',function(req, res){
    res.json(req.user);
  });
// ajouter un utilisateur
  userRouter.route('/').post(function(req, res){
    var user = new User(req.body);
    user.save();
    res.status(201).send(user);
  });
// recuperer un utilisateur par id
  userRouter.route('/:id')
    .get(function(req, res){
      res.json(req.user);
    })
    // modifier un utilisateur
    .put(function(req, res){
      User.id=req.params.id;

      User.findOneAndUpdate({_id:User.id}
        ,{

          $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            statut :req.body.role,
            cart:req.body.cart

          }

        },    function(err){
          if(err)
            res.status(500).send(err);
          else{
            res.json(req.user);
          }
        });
    })
    // supprimer un utilisateur
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