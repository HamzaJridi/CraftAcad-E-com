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
    .when('/casual', {
      templateUrl: 'public/views/casual.html',
      //controller: 'ProductsCtrl'
    })
    .when('/sport', {
      templateUrl: 'public/views/sport.html',
      //controller: 'ProductsCtrl'
    })
    .otherwise({
      redirectTo : '/home'
    });
}]);

