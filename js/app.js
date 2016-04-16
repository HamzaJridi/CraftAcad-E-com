var myApp = angular.module('myApp', ['ngRoute', 'pageControllers']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'home'
        })

        .when('/pantal', {
            templateUrl : 'views/pantal.html',
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

        /*.when('/details/:itemId', {
            templateUrl : 'views/chemisedetails.html',
            controller : 'ChemiseDetailsCtrl'
        })*/

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