angular.module('myApp', ['ngRoute'])
  .config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'public/views/home.html',
      controller: 'LoginCtrl'
    })
    .when('/suits', {
      templateUrl: 'public/views/suits.html',
      controller: 'ProductsCtrl'
    })
    .when('/prodCrud', {
      templateUrl: 'public/views/prodCrud.html',
      controller: 'ProductsCtrl'
    })
    .when('/userCrud', {
      templateUrl: 'public/views/userCrud.html',
      controller: 'UsersCtrl'
    })
    .when('/casual', {
      templateUrl: 'public/views/casual.html',
      //controller: 'ProductsCtrl',
    })
    .when('/sport', {
      templateUrl: 'public/views/sport.html',
      //controller: 'ProductsCtrl',
    })
    .when('/suitDetails/:itemId', {
      templateUrl : 'public/views/suitDetails.html',
      controller : 'CartShopCtrl'
    })
    .when('/cartshop',{
      templateUrl:'public/views/cartShop.html',
      controller:'CartShopCtrl'

    })
    .when('/login', {
      templateUrl : 'public/views/login.html',
      controller : 'LoginCtrl'
    })
    .when('/register', {
      templateUrl : 'public/views/register.html',
      controller : 'RegisterCtrl'
    })
    .when('/logout', {
      templateUrl : 'public/views/logout.html',
      controller : 'LogoutCtrl'
    })
    .when('/adminreg', {
      templateUrl : 'public/views/adminReg.html',
      controller : 'AdminAuthCtrl'
    })
    .otherwise({
      redirectTo : '/home'
    });
}]);

