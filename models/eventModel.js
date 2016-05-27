var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventModel = new Schema({
  name : {type:String},
  ticketPrice  :{type:Number},
  description : {type:String},
  maxVisitors : {type : Number},
  subsDeadLine : {type : Date},
  listOfVisitors : [{
    userId : {type :String },
    username : {type :String }
  }]
});



module.exports = mongoose.model('Event', eventModel);