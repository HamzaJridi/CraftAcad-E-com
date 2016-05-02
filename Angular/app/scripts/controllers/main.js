'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope,Article) {
      $scope.message = "angular works";
      $scope.articles = [
        {"title" : "pantal1"},
        {"title" : "pantal2"},
      ];

      $scope.articles = Article.getList().$object;
  });
