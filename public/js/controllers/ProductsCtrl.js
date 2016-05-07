angular.module('myApp').controller('ProductsCtrl',['$scope', '$http',function($scope,$http){
  var getProducts = function () {
    $http.get('/products').success(function (products) {
      console.log('I received the data', products);
      $scope.products = products;
    });
  };
  getProducts();
}]);