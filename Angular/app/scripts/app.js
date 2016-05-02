'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
            templateUrl: 'views/about.html',
          controller: 'ArticlesCtrl',
          controllerAs: 'articles'
        })
      .when('/articles', {
        templateUrl: 'views/articles.html',
        controller: 'ArticlesCtrl',
        controllerAs: 'articles'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
