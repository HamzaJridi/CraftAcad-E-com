var myApp = angular.module('myApp', ['ngRoute', 'pageControllers']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'public/views/home.html',
            controller: 'HomeCtrl'
        })

        .when('/pantal', {
            templateUrl : 'public/views/pantal.html',
            controller : 'PantCtrl'
        })

        .when('/details/:itemId', {
            templateUrl : 'views/details.html',
            controller : 'DetailsCtrl'
        })

        .when('/chemise', {
            templateUrl : 'views/chemise.html',
            controller : 'ChemiseCtrl'
        })

        .when('/chemiseDetails/:itemId', {
            templateUrl : 'views/chemiseDetails.html',
            controller : 'ChemiseDetailsCtrl'
        })

        .when('/login', {
            templateUrl : 'views/login.html',
            controller : 'LoginCtrl'
        })

        /*.when('/panier', {
            templateUrl : 'views/panier.html',
            controller : 'LoginCtrl'
        })*/

        .otherwise({
            redirectTo : '/home'
        });

}]);