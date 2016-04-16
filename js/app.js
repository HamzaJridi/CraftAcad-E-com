var myApp = angular.module('myApp', ['ngRoute', 'pageControllers']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/pageOne', {
            templateUrl : 'views/pageOne.html',
            controller : 'PageOne'
        })

        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'home'
        })

        .when('/pageThree', {
            templateUrl : 'views/pageThree.html',
            controller : 'PageThree'
        })

        .otherwise({
            redirectTo : '/'
        });

}]);