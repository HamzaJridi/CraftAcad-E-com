var express = require('express');
var passport = require('passport');

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
    //res.status(200).json({
    //  status: 'User Logged Out..Bye!!'
    //});

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


  return userRouter
};

module.exports = routes;