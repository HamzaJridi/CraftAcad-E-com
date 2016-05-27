var express = require('express');
var passport = require('passport');
var User = require('../models/userModel');

var routes = function(Event){
  var eventRouter = express.Router();
  /** set the event route using eventRouter.route('newRoute') method*/
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

  //the Events Middleware for get, put and delete reqs
  eventRouter.use('/:eventId',function(req,res,next){
      //get the id passed in the url using req.params
    Event.findById(req.params.eventId, function(err,event){
      if(err){
        res.status(500).send(err);
      } else if (event){
        req.event = event;
        next();
      } else {
        res.status(404).send('Event not found');
      }
    });
  });

  eventRouter.route('/:eventId')
    //get a specific item by its id and display it
    .get(function(req,res){
      //req.event = event in the middleware
      res.json(req.event);
    })

    //get a specific item by its id to update it
    .put(function(req,res){
      /** getting a single event item by its Id */
      //get the id passed in the url using req.params
      /**replace the event properties with what has
       * come back from the req using req.body*/
      req.event.name = req.body.name;
      req.event.imgUrl = req.body.imgUrl;
      req.event.ticketPrice = req.body.ticketPrice;
      req.event.description = req.body.description;
      req.event.maxVisitors = req.body.maxVisitors;
      req.event.date = req.body.date;
      //req.event.subsDeadLine = req.body.subsDeadLine;
      //req.event.listOfVisitors = req.body.listOfVisitors;
      //save changes in the db
      req.event.save(function(err){
        if(err){
          res.status(500).send(err);
        } else {
          //send back event to display it as a json format
          res.json(req.event);
        }
      });

    })
    //
    .delete(function(req,res){
      req.event.remove(function(err){
        if(err) {
          res.status(500).send(err);
        }
        else{
          res.status(204).send('Event Removed');
        }
      });
    });













  return eventRouter
};

module.exports = routes;