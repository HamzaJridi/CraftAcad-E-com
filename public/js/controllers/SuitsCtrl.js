angular.module('myApp').controller('SuitsCtrl',
  ['$scope', '$http','AuthService',
    function($scope,$http,AuthService){

      $scope.maxSize = 9;
      $scope.currentPage = 1;
      $scope.totalItems = 0;

      var getSuits = function () {
        $http.get('/products/category/suits').success(function (response) {
          console.log('I received the data', response);
          $scope.products = response;
          $scope.product = "";
        });
      };
      //invoke the getProducts method to display all the prods
      getSuits();
    }]);