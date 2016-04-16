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

        .otherwise({
            redirectTo : '/home'
        });

}]);