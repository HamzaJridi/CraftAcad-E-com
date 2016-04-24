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
// Pantallon Controller
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

pageControllers.controller('ChemiseCtrl', ['$scope', '$http',
    function($scope, $http){
        $http.get('data/chemise.json').success(function(chemise){
            $scope.chemise = chemise;
        });
    }]);

pageControllers.controller('ChemiseDetailsCtrl', ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams){
        $http.get('data/pantal.json').success(function(chemise){
            $scope.chemise = pantal;
            $scope.whichItem = $routeParams.itemId;
        });
    }]);

myApp.controller('LoginCtrl',
    ['$scope', '$http', '$location', '$rootScope' ,
        function($scope, $http, $location, $rootScope) {
            $http.get('data/users.json').success(function(data) {
                $scope.data= data;
                $scope.log=function(){
                    for (var i =0; i < $scope.data.length; i++) {
                        if($scope.user.email==$scope.data[i].email && $scope.user.password==$scope.data[i].password) {
                            $rootScope.isLogin = true;
                        }
                    }
                    if ($rootScope.isLogin) {
                        $location.path('/panier');
                    } else {
                        $scope.errormsg = "Sorry, your Email and Password are not valid"
                        $scope.user.email = '';
                        $scope.user.password = '';
                    }
                };
                $rootScope.logOut = function() {
                    $location.path('/login');
                    $rootScope.isLogin = false;
        }
    });
}]);
