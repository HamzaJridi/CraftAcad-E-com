var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventModel = new Schema({
  name: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  maxVisitors: {
    type: Number,
    required: true
  },
  date: {
    type: Date
  }, //,required : true
  listOfVisitors: [{
    eventId: {
      type: String
    },
    userId: {
      type: String
    },
    username: {
      type: String
    }
  }]
});



module.exports = mongoose.model('Event', eventModel);