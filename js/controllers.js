var pageControllers = angular.module('pageControllers', []);

pageControllers.controller('PageOne', ['$scope', function($scope){
    $scope.message = "Hello"
}]);

pageControllers.controller('PageTwo', ['$scope', '$http', function($scope, $http){
    $http.get('js/data.json').success(function(_data){
        $scope.data=_data;
    });
}]);

pageControllers.controller('PageThree', ['$scope', '$http', function($scope, $http){
    $http.get('js/data.json').success(function(_data){
        $scope.data=_data;
    });
}]);