angular.module('myApp', ['ngRoute'])
  .config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'public/views/home.html',
      //controller: 'HomeCtrl'
      access: {restricted: true}
    })
    .when('/suits', {
      templateUrl: 'public/views/suits.html',
      controller: 'ProductsCtrl',
    access: {restricted: true}
    })
    .when('/prodCrud', {
      templateUrl: 'public/views/prodCrud.html',
      controller: 'ProductsCtrl',
      access: {restricted: true}
    })
    .when('/casual', {
      templateUrl: 'public/views/casual.html',
      //controller: 'ProductsCtrl',
      access: {restricted: true}
    })
    .when('/sport', {
      templateUrl: 'public/views/sport.html',
      //controller: 'ProductsCtrl',
      access: {restricted: true}
    })
    .when('/suitDetails/:itemId', {
      templateUrl : 'public/views/suitDetails.html',
      controller : 'ProdDetailCtrl',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl : 'public/views/login.html',
      controller : 'LoginCtrl'
    })
    .when('/register', {
      templateUrl : 'public/views/register.html',
      controller : 'LoginCtrl'
    })
    .when('/logout', {
      templateUrl : 'public/views/logout.html',
      controller : 'LogoutCtrl'
    })
    .otherwise({
      redirectTo : '/home'
    });
}]);

