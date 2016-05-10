angular.module('myApp').controller('ProductsCtrl',
  ['$scope', '$http','AuthService',
    function($scope,$http,AuthService){
      var getProducts = function () {
        $http.get('/products').success(function (response) {
          console.log('I received the data', response);
          $scope.products = response;
          $scope.product = "";
      });
    };
      //invoke the getProducts method to display all the prods
      getProducts();


      //add a product method
      $scope.addProd = function () {
        $http.post('/products', $scope.product).success(function (response) {
          getProducts();
        });
      };

      //edit a product method to get the prod props in fie
      $scope.editProd = function(id) {
        console.log(id);
        $http.get('/products/' + id).success(function(response) {
          //get the sent back data from the server and put it in the input fields
          $scope.product = response;
        });
      };
      $scope.updateProd = function() {
        console.log($scope.product._id);
        //send to the server the updated product data
        $http.put('/products/' + $scope.product._id, $scope.product)
          .success(function(response) {
            getProducts();
          }
        );
      };

      //delete a product method
      $scope.removeProd = function(id){
        console.log(id);
        //send the product's id to the server
        $http.delete('/products/' + id).success(function(response){
          getProducts();
        });
        getProducts();
      };

      $scope.deselect = function() {
        $scope.product="";
      };
    }]);


//the details page controller
angular.module('myApp').controller('ProdDetailCtrl',
  ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {
    var id = $routeParams.itemId;
    console.log(id);
    $http.get('/products/' + id).success(function (response) {
      $scope.product = response;
    });
  }]);