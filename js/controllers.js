var pageControllers = angular.module('pageControllers', []);

pageControllers.controller('PageOne', ['$scope', function($scope){
    $scope.message = "Hello"

}]);

pageControllers.controller('home', ['$scope', function($scope){
    $scope.message = "Hello home page"
    $(document).ready(function() {
        $('.carousel').carousel({
            interval: 5000
        })
    });
}]);

pageControllers.controller('PageThree', ['$scope', '$http', function($scope, $http){
    $http.get('js/data.json').success(function(_data){
        $scope.data=_data;
    });
}]);