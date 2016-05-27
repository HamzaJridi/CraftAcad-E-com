var express = require('express');
var passport = require('passport');
var User = require('../models/userModel');

var routes = function(Event){
  var eventRouter = express.Router();
  /** set the product route using productRouter.route('newRoute') method*/
  eventRouter.route('/')
    //the post method require the bodyParser
    .post(function(req,res){
      var event = new Event(req.body);
      event.save();
      res.status(201).send(event);
    })
    .get(function(req,res){
      console.log('I got a GET Request for events');
      Event.find(function (err,events) {
        if(err){console.log(err)}

        res.json(events);
      });
    });













  return eventRouter
};

module.exports = routes;