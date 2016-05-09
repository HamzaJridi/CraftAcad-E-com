// controlleur details product
angular.module('myApp').controller('CartShopCtrl', ['$location','$scope', '$http','$routeParams',
  '$rootScope',function($location,$scope, $http, $routeParams,$rootScope){
    var id =$routeParams.itemId;
    // console.log(id);
    $http.get('/products/'+id).success(function(data){
      $scope.product = data;});

    $scope.quantite=1;

    var getAll = function () {
      $scope.products = [] ;
      $http.get('/users/session').success(function(response){
        console.log(response);
        $scope.cart = response.cart;
        for (var i = 0; i < $scope.cart.length; i++) {
          $http.get('/products/'+$scope.cart[i]).success(function(data){
            console.log(data);
            $scope.products.push(data);
          });

        }
        console.log('i received the data i requested');
      });
    };



          $http.get('/products/' + id).success(function (response) {
            $scope.product = response;
          });


    getAll();
    $scope.maxSize = 9;
    $scope.currentPage = 1;
    $scope.totalItems = 0;
    $scope.prix=500

// ajouter un produit dans un panier
    $scope.addpanier=function(product){
      console.log("aaaaaaaa");
      console.log(product._id);
      $http.get('/users/session').success(function(response){
        console.log(response);
        $scope.user=response;

        $http.get('/users/'+$scope.user._id+'/cart/'+product._id).success(function(res){
          console.log(res);
          $scope.products.push(product._id)
          $location.path('/cart');
          getAll();



        })

      })};


    // recuperer les produits d'un panier
//       var panier=function(){
//          $http.get('/users/session').success(function(response){
//            $scope.usercart=response.panier;
//
//             for (var i = 0; i < $scope.usercart.length; i++) {
//               $http.get('/produits/'+$scope.usercart[i]).success(function(data){
//                 $rootScope.produits.push(data);
//
//
//
//             });
//             }
//         })};
// panier();





    $scope.delete= function (product) {
      $http.get('/users/session').success(function(response){
        $scope.user=response;

        console.log($scope.user);
        $http.delete('/users/'+$scope.user._id+'/cart/'+product._id).success(function(data){

          console.log('delete ok');





        });
        getAll();
      });
    }
  }]);
