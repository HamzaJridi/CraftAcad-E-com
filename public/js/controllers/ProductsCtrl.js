angular.module('myApp').controller('ProductsCtrl',
  ['$scope', '$http',
    function($scope,$http){
      var getProducts = function () {
        $http.get('/products').success(function (response) {
        console.log('I received the data', response);
        $scope.products = response;
      });
    };
  getProducts();

  //$scope.getdetail = function (id) {
  //  console.log(id);
  //  $http.get('/products/'+id).success(function (response) {
  //    $scope.product = response;
  //    console.log($scope.product);
  //  });
  //};

}]);

angular.module('myApp').controller('ProdDetailCtrl',
  ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {
    var id = $routeParams.itemId;
    console.log(id);
    $http.get('/products/' + id).success(function (data) {
      $scope.product = data;
    });
  }]);