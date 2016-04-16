var pageControllers = angular.module('pageControllers', []);

pageControllers.controller('PageOne', ['$scope', function($scope){
    $scope.message = "Hello"

}]);


pageControllers.controller('home', ['$scope', '$http', function($scope, $http){
    $http.get('data/pantal.json').success(function(pantal){
        $scope.pantal = pantal;
        $(document).ready(function() {
            $('.carousel').carousel({
                interval: 5000
            })
        });
    });
}]);

pageControllers.controller('PantCtrl', ['$scope', '$http',
    function($scope, $http){
    $http.get('data/pantal.json').success(function(pantal){
        $scope.pantal = pantal;
    });
}]);

pageControllers.controller('DetailsCtrl', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
    $http.get('data/pantal.json').success(function(pantal){
        $scope.pantal = pantal;
        $scope.whichItem = $routeParams.itemId;
    });
}]);