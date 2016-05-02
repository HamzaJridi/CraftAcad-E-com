var restful = require('node-restful');

module.exports = function(app, route) {

    /*Setup the controller for REST
     * app.models.article : article is the mongoose model exported from the ('models/index.js) file
     * restful.model('article'... : is the collection name in the ecommerce db*/
    var rest = restful.model('article',app.models.article).methods(['get', 'put', 'post', 'delete']);

    //Register thr rest API to the app's route
    rest.register(app, route);

    //Return middleware
    return function (req, res, next) {
        next();
    };
};