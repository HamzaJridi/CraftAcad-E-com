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
    'ngRoute',
    'restangular',
  ])
  .config(function ($routeProvider, RestangularProvider) {

      // Set the base URL for Restangular.
      RestangularProvider.setBaseUrl('http://localhost:8000');

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
      .when('/articles', {
        templateUrl: 'views/articles.html',
        controller: 'ArticlesCtrl',
        controllerAs: 'articles'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

/*convert "_id" to "id"*/
.factory('ArticleRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  });
})

.factory('Article', function(ArticleRestangular) {
  return ArticleRestangular.service('articles');
});
