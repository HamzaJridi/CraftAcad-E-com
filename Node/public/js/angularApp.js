var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when ('/', {
        templateUrl : 'public/views/main.html',
        //controller : 'ArticleCtrl',
    })
        .when ('/articles', {
        templateUrl : 'public/views/articles.html',
        controller : 'ArticleCtrl',
        })
        .when ('/details/:itemId', {
         templateUrl : 'public/views/details.html',
         controller : 'ArticleCtrl',
         })
        .otherwise({
            redirectTo : '/'
        });
}]);