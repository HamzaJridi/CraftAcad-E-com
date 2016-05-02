var mongoose = require('mongoose');


var articleSchema = new mongoose.Schema ({
    title: {type: String},
    img: {type: String},
    prix: {type: String},
    quantite: {type: Number},
    description: {type: String},
});

//Export the Model Schema
module.exports= articleSchema;