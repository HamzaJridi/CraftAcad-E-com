/* The cart shop controller
* add, delete products*/
angular.module('myApp').controller('CartShopCtrl',
  ['$location','$scope', '$http','$routeParams',
    function($location,$scope, $http, $routeParams){
      var id =$routeParams.itemId;
      $http.get('/products/'+id).success(function(data){
        $scope.product = data;
      });
      $scope.qte=1;

      var refresh = function () {
        //$scope.products = [] ;
        $http.get('/users/session').success(function(response){
          $http.get('/users/'+response._id).success(function(user){
            console.log(response);
            $scope.cart = user[0].cart;
            //for (var i = 0; i < $scope.cart.length; i++) {
            //  //$http.get('/products/'+$scope.cart[i]).success(function(data){
            //    //console.log(data);
            //    $scope.products.push($scope.cart[i]);
            //  //});
            //}
            console.log('I\'ve got the requested data');
          });
        });
      };

      $http.get('/products/' + id).success(function (response) {
        $scope.product = response;
      });

      refresh();

      // Add a product to the Cart
      $scope.addToCart=function(product){
        console.log(product._id);
        $http.get('/users/session').success(function(response){
          console.log(response);
          $scope.user=response;
          $http.get('/users/' + $scope.user._id + '/cart/' +product._id + '/' +product.title + '/' +product.imgUrl+ '/' +product.price+ '/' +product.quantity+ '/' +$scope.qte).success(function(err){
            refresh();
          })
        })};

      //remove prod from the Shopping Cart
      $scope.delete = function (id) {
        $http.get('/users/session').success(function(response){
          $scope.user=response;
          console.log($scope.user);
          $http.delete('/users/'+$scope.user._id+'/cart/'+ id).success(function(data){
            console.log('Product deleted Successfully');
            refresh();
          });
        });
      };

      // Reserve a product
      $scope.reserve=function(date,product){
        $http.get('/users/session').success(function(response){
          $http.get('/users/'+response._id).success(function(user){
              console.log(user[0]);
              $http.post('products/'+ product._id+'/reservation/'+user[0].username+'/date/'+date).success(function(res){
                $scope.message = 'Your product has been  reserved Successfully';
                console.log("Your product has been reserved successfully");
              });
          });
        });
      }; //reserve function

      //disable reserved date
      $scope.product={};
      $scope.minDate = new Date();
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
  }]);
