var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventtModel = new Schema({
  name : {type:String,required : true},
  ticketPrice  :{type:Number,required : true},
  description : {type:String},
  maxVisitors : {type : String},
  subsDeadLine : {type : Date},
  listOfVisitors : [{
    userId : {type :String },
    username : {type :String }
  }]

});



module.exports= mongoose.model('Product', eventtModel);