angular.module('myApp', ['ngRoute','ngMaterial','ui.bootstrap'])
  .config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'public/views/home.html',
      controller: 'LoginCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .when('/suits', {
      templateUrl: 'public/views/suits.html',
      controller: 'SuitsCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .when('/wedding', {
      templateUrl: 'public/views/wedding.html',
      controller: 'WedCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .when('/prodCrud', {
      templateUrl: 'public/views/prodCrud.html',
      controller: 'ProductsCtrl',
      access: {restricted: true},
      admin: {restricted: true}
    })
    .when('/userCrud', {
      templateUrl: 'public/views/userCrud.html',
      controller: 'UsersCtrl',
      access: {restricted: true},
      admin: {restricted: true}
    })
    .when('/casual', {
      templateUrl: 'public/views/casual.html',
      access: {restricted: false},
      admin: {restricted: false}
      //controller: 'ProductsCtrl',
    })
    .when('/sport', {
      templateUrl: 'public/views/sport.html',
      access: {restricted: false},
      admin: {restricted: false}
      //controller: 'ProductsCtrl',
    })
    .when('/reservations/:itemId', {
      templateUrl: 'public/views/reservations.html',
      controller: 'ProdDetailCtrl',
      access: {restricted: true},
      admin: {restricted: true}
    })
    .when('/suitDetails/:itemId', {
      templateUrl : 'public/views/prodsDetails.html',
      controller : 'CartShopCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .when('/userDetails/:itemId', {
      templateUrl : 'public/views/userDetails.html',
      controller : 'UserDetailCtrl',
      access: {restricted: true},
      admin: {restricted: true}
    })
    .when('/cartshop',{
      templateUrl:'public/views/cartShop.html',
      controller:'CartShopCtrl',
      access: {restricted: true},
      admin: {restricted: false}
    })
    .when('/myItems',{
      templateUrl:'public/views/myItems.html',
      controller:'CartShopCtrl',
      access: {restricted: true},
      admin: {restricted: false}
    })
    .when('/login', {
      templateUrl : 'public/views/login.html',
      controller : 'LoginCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .when('/register', {
      templateUrl : 'public/views/register.html',
      controller : 'RegisterCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .when('/logout', {
      templateUrl : 'public/views/logout.html',
      controller : 'LogoutCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .when('/adminreg', {
      templateUrl : 'public/views/adminReg.html',
      controller : 'AdminAuthCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .when('/404', {
      templateUrl : 'public/views/404.html',
      //controller : 'AdminAuthCtrl',
      access: {restricted: false},
      admin: {restricted: false}
    })
    .otherwise({
      redirectTo : '/home'
    });
}])

//restrict route access only for logged in users
.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      //AuthService.getUserStatus()
      //  .then(function () {
          //user authenticated restriction
          if (next.access.restricted && AuthService.isLoggedIn() === false) {
            $location.path('/login');
            $route.reload();
          }
          //admin restriction
          if (next.admin.restricted && $rootScope.isAdmin === false) {
            alert('This page is accessed only by admins');
            $location.path('/404');
            $route.reload();
          }
        //});
    });
});

