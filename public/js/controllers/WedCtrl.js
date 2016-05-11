angular.module('myApp').controller('WedCtrl',
  ['$scope', '$http','AuthService',
    function($scope,$http,AuthService){

      $scope.maxSize = 6;
      $scope.currentPage = 1;
      $scope.totalItems = 0;

      var getWeds = function () {
        $http.get('/products/category/wedding').success(function (response) {
          console.log('I received the data', response);
          $scope.products = response;
          $scope.product = "";
        });
      };
      //invoke the getProducts method to display all the prods
      getWeds();
    }]);