var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleModel = new Schema({
    title: {type: String},
    img: {type: String},
    prix: {type: String},
    quantite: {type: Number},
    description: {type: String},
});


module.exports= mongoose.model('Article', articleModel);