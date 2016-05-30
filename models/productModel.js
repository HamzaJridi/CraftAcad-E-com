var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productModel = new Schema({
  title: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  ref: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  toReserve: {
    type: Boolean,
    default: false
  },
  descr: {
    type: String
  },
  listReser: [{
    username: {
      type: String
    },
    prodId: {
      type: String
    },
    dateRes: {
      type: Date
    }
  }]
});


/**Product is an instance of the productModel Schema
 * create and export the Product as a productModel instance*/
module.exports =
  //mongoose.model('disponibilityDate', disponibilityDate),
  //mongoose.model('listReservation', listReservation),
  mongoose.model('Product', productModel);