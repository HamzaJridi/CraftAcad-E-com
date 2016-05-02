var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when ('/', {
        templateUrl : 'public/views/main.html',
        controller : 'ArticleCtrl',
    })
        .when ('/articles', {
        templateUrl : 'public/views/articles.html',
        controller : 'ArticleCtrl',
        })
        .when ('/details/:itemId', {
         templateUrl : 'public/views/details.html',
         controller : 'ArticleCtrl',
         })
        .when('/login', {
            templateUrl : 'public/views/login.html',
            controller : 'LoginCtrl',
            //access: {restricted: false}
        })
        .when('/logout', {
            controller : 'LoginCtrl',
            //access: {restricted: true}
        })
        .when('/register', {
            templateUrl : 'public/views/register.html',
            controller : 'RegisterCtrl',
            //access: {restricted: false}
        })
        .when('/panier', {
            templateUrl : 'public/views/panier.html',
            controller : 'RegisterCtrl',
            //access: {restricted: false}
        })
        .otherwise({
            redirectTo : '/'
        });
}]);