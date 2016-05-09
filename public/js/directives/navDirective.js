angular.module('myApp').directive('navdir', function() {
  return {
    restrict: 'E',
    templateUrl:'public/views/nav.html',
    controller:['$scope','$http','$rootScope', function($scope,$http,$rootScope) {
      $rootScope.islogged = false;

      $http.get('/users/session').success(function(response){
        console.log(response);
        $scope.user=response;
        $http.get('/users/'+$scope.user._id).success(function(user){
          console.log(user);
          if(user){
            $rootScope.islogged = true;
          }
        });
      });
    }]
  };
});