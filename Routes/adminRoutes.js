var express = require('express');
var passport = require('passport');
var User = require('../models/userModel');

var adminRoutes = function(Admin){
  var adminRouter = express.Router();

  //Register method
  adminRouter.post('/register', function(req, res) {
    Admin.register (new Admin({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        role: req.body.role
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


  return adminRouter
};

module.exports = adminRoutes;