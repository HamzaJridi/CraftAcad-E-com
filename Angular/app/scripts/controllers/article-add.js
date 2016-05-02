'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ArticleAddCtrl
 * @description
 * # ArticleAddCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ArticleAddCtrl', function ($scope,Article,$location) {
        $scope.article = {};
        $scope.saveArticle = function(){
            Article.post($scope.article).then(function () {
                $location.path('/articles');
            });
        };
  });
