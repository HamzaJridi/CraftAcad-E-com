var express = require('express');

var routes = function(Article){
    var articleRouter = express.Router();
    articleRouter.route('/')
        .get(function (req, res) {
            Article.find(function(err,articles){
                if(err){
                    res.status(500).send(err);
                } else {
                    //display books data from the db as a json format
                    res.json(articles);
                }
            });
        });
    return articleRouter;
};

module.exports = routes;