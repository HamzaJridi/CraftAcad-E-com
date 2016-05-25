angular.module('myApp').controller('SuitsCtrl',
  ['$scope', '$http','AuthService',
    function($scope,$http,AuthService){

      $scope.maxSize = 9;
      $scope.currentPage = 1;
      $scope.totalItems = 0;

      $http.get('/products/category/suits').success(function (response) {
        console.log('I received the data', response);
        $scope.products = response;
        $scope.product = "";
      });
    }
  ]);

angular.module('myApp').controller('CasualCtrl',
  ['$scope', '$http','AuthService',
    function($scope,$http,AuthService){

      $scope.maxSize = 9;
      $scope.currentPage = 1;
      $scope.totalItems = 0;

      $http.get('/products/category/casual').success(function (response) {
        console.log('I received the data', response);
        $scope.products = response;
        $scope.product = "";
      });
    }
  ]);

angular.module('myApp').controller('SportCtrl',
  ['$scope', '$http','AuthService',
    function($scope,$http,AuthService){

      $scope.maxSize = 9;
      $scope.currentPage = 1;
      $scope.totalItems = 0;

      $http.get('/products/category/sport').success(function (response) {
        console.log('I received the data', response);
        $scope.products = response;
        $scope.product = "";
      });
    }
  ]);

