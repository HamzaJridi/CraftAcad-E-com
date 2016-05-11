/* The cart shop controller
* add, delete products*/
angular.module('myApp').controller('CartShopCtrl',
  ['$location','$scope', '$http','$routeParams',
    function($location,$scope, $http, $routeParams){
    var id =$routeParams.itemId;
    $http.get('/products/'+id).success(function(data){
      $scope.product = data;
    });
      $scope.quantityPr=1;

      var getUsers = function () {
        $scope.products = [] ;
        $http.get('/users/session').success(function(response){
          console.log(response._id);
          $http.get('/users/'+response._id).success(function(user){
            console.log(response);
            $scope.cart = user[0].cart;
            console.log($scope.cart);
            for (var i = 0; i < $scope.cart.length; i++) {
              $http.get('/products/'+$scope.cart[i]).success(function(data){
                //console.log(data);
                $scope.products.push(data);
              });

            }
            console.log('I\'ve got the requested data');
          });});
      };

    $http.get('/products/' + id).success(function (response) {
      $scope.product = response;
    });

    getUsers();

    // Add a product to the Cart
    $scope.addToCart=function(product){
      console.log(product._id);
      $http.get('/users/session').success(function(response){
        console.log(response);
        $scope.user=response;

        $http.get('/users/'+$scope.user._id+'/cart/'+product._id).success(function(res){
          console.log(res);
          $scope.products.push(product._id)
          $location.path('/cart');
          getUsers();
        })
      })};


    $scope.delete= function (product) {
      $http.get('/users/session').success(function(response){
        $scope.user=response;
        console.log($scope.user);
        $http.delete('/users/'+$scope.user._id+'/cart/'+product._id).success(function(data){
          console.log('Product deleted Succefully');
          getUsers();
        });
      });
    }

      // Reserve a product
      $scope.reserve=function(date,product){
        console.log(product._id);
        console.log(date);
        $http.get('/users/session').success(function(response){
          console.log(response._id);
          $http.get('/users/'+response._id).success(function(user){
            console.log(user[0]);

            $http.post('products/'+ product._id+'/reservation/'+user[0].username+'/date/'+date).success(function(res){
              $scope.message = 'Your product is reserved for the date ' + date;
              console.log("Your product is reserved for the date "+date);
            });
          });
        });
      }//reserver function

      //disable reserved date
      $scope.product={};
      $scope.disableDate = function(date) {
        var available = true;
        if($scope.product.listReser) {
          for (var i=0 ; i<$scope.product.listReser.length;i++){
            if ((new Date($scope.product.listReser[i].dateRes).getFullYear()===date.getFullYear())
              &&(new Date($scope.product.listReser[i].dateRes).getMonth()===date.getMonth())
              &&(new Date($scope.product.listReser[i].dateRes).getDate()===date.getDate()))
            { available = false; }
          }}
        return available;
      };

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };

  }]);
