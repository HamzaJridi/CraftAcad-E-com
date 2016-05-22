//Registering Controller
angular.module('myApp').controller('RegisterCtrl',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {
      $scope.register = function () {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call register from service
        AuthService.register($scope.registerForm.firstname,
          $scope.registerForm.lastname,
          $scope.registerForm.username,
          $scope.registerForm.password)
          // handle success
          .then(function () {
            $location.path('/login');
            $scope.disabled = false;
            $scope.registerForm = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Sorry, Username exists already";
            $scope.disabled = false;
            $scope.registerForm = {};
          });
      };
    }]);

//Login Controller
angular.module('myApp').controller('LoginCtrl',
  ['$scope', '$location', 'AuthService','$rootScope',
    function ($scope, $location, AuthService,$rootScope) {
      $scope.login = function () {
        // initial values
        $scope.error = false;
        $scope.disabled = true;
        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password)
          // handle success
          .then(function () {
            $location.path('/');
            $scope.disabled = false;
            $scope.loginForm = {};
            $rootScope.islogged = true;
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
            $rootScope.islogged = false;
          });
      };
      $scope.logout = function () {

        // call logout from service
        AuthService.logout()
          .then(function () {
            $location.path('/login');
            $rootScope.islogged = false;
          });

      };
    }
  ]);


//Logout Controller
angular.module('myApp').controller('LogoutCtrl',
  ['$scope', '$location', 'AuthService','$rootScope',
    function ($scope, $location, AuthService,$rootScope) {

        // call logout from service
        AuthService.logout()
          .then(function () {
            $location.path('/login');
            $rootScope.islogged = false;
          });
    }
  ]);
