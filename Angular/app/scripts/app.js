'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
    .module('clientApp', [
      'ngRoute',
      'restangular'
    ])
    .config(function ($routeProvider, RestangularProvider) {

      // Set the base URL for Restangular.
      RestangularProvider.setBaseUrl('http://localhost:3000');

      $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
          .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
          })
          .when('/articles', {
            templateUrl: 'views/articles.html',
            controller: 'ArticlesCtrl'
          })
          .when('/create/article', {
            templateUrl: 'views/article-add.html',
            controller: 'ArticlesAddCtrl'
          })
          .when('/article/:id', {
            templateUrl: 'views/article-view.html',
            controller: 'ArticlesViewCtrl'
          })
          .when('/article/:id/edit', {
            templateUrl: 'views/article-edit.html',
            controller: 'ArticlesEditCtrl'
          })
          .when('/article/:id/delete', {
            templateUrl: 'views/article-delete.html',
            controller: 'ArticlesDeleteCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    })
    .factory('ArticlesRestangular', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setRestangularFields({
          id: '_id'
        });
      });
    })
    .factory('Article', function(ArticleRestangular) {
      return ArticleRestangular.service('article');
    });