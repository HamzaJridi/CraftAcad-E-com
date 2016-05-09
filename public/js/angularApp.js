angular.module('myApp', ['ngRoute'])
  .config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'public/views/home.html',
      //controller: 'HomeCtrl'
    })
    .when('/suits', {
      templateUrl: 'public/views/suits.html',
      controller: 'ProductsCtrl'
    })
    .when('/prodCrud', {
      templateUrl: 'public/views/prodCrud.html',
      controller: 'ProductsCtrl'
    })
    .when('/casual', {
      templateUrl: 'public/views/casual.html',
      //controller: 'ProductsCtrl'
    })
    .when('/sport', {
      templateUrl: 'public/views/sport.html',
      //controller: 'ProductsCtrl'
    })
    .when('/suitDetails/:itemId', {
      templateUrl : 'public/views/suitDetails.html',
      controller : 'ProdDetailCtrl'
    })
    .when('/login', {
      templateUrl : 'public/views/login.html',
      controller : 'LoginCtrl'
    })
    .when('/register', {
      templateUrl : 'public/views/register.html',
      controller : 'LoginCtrl'
    })
    .otherwise({
      redirectTo : '/home'
    });
}]);

