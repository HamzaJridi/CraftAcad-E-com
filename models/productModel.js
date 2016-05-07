var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//set the disponibility date Schema of a product
/*var disponibilityDate = new Schema ({
  start : {type:Date},
  end : {type : Date}
});*/

/*set the list of reservations of a product that contains info about
* the user who reserved the product, the product_id and the date of reservation*/
//var listReservation = new  Schema ({
//  userId : {type : String},
//  productId : {type : String},
//  dateReserv : {type : Date}
//});

var productModel = new Schema({
  title : {type:String,required : true},
  imgUrl : {type:String,required : true},
  price  :{type:String,required : true},
  quantity : {type:Number,required : true},
  ref : {type:String,required : true},
  category : {type:String,required : true},
  descr : {type:String},

  /*for now presume that the product is disponible all over the year
  dispoDate : {type : disponibilityDate },*/

  //listReserv : {type : [listReservation] }
});


/**Product is an instance of the productModel Schema
 * create and export the Product as a productModel instance*/
module.exports=
  //mongoose.model('disponibilityDate', disponibilityDate),
  //mongoose.model('listReservation', listReservation),
  mongoose.model('Product', productModel);