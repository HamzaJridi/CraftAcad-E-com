var myApp = angular.module('myApp', ['ngRoute', 'pageControllers']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'client/views/home.html',
            controller: 'home'
        })

        .when('/pantal', {
            templateUrl : 'client/views/pantal.html',
            controller : 'PantCtrl'
        })

        .when('/details/:itemId', {
            templateUrl : 'client/views/details.html',
            controller : 'DetailsCtrl'
        })

        .when('/chemise', {
            templateUrl : 'client/views/chemise.html',
            controller : 'ChemiseCtrl'
        })

        .when('/chemiseDetails/:itemId', {
            templateUrl : 'client/views/chemiseDetails.html',
            controller : 'ChemiseDetailsCtrl'
        })

        .when('/login', {
            templateUrl : 'client/views/login.html',
            controller : 'LoginCtrl'
        })

        .when('/panier', {
            resolve: {
                "check" : function($location, $rootScope){
                    if(!$rootScope.isLogin){
                        $location.path('/login');
                    }
                }
            },
            templateUrl : 'client/views/panier.html',
            controller : 'LoginCtrl'
        })

        .otherwise({
            redirectTo : '/home'
        });

}]);