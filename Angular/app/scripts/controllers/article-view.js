'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ArticleViewCtrl
 * @description
 * # ArticleViewCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ArticleViewCtrl', function ($scope,$routeParams,Article) {
        $scope.viewArticle = true;
        $scope.article = Article.one($routeParams.id).get().$object;
  });
