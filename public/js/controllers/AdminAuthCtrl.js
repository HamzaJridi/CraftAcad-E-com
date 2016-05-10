//Registering Controller
angular.module('myApp').controller('AdminAuthCtrl',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.adminRegister = function () {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call adminReg from service
        AuthService.adminReg(
          $scope.registerForm.firstname,
          $scope.registerForm.lastname,
          $scope.registerForm.username,
          $scope.registerForm.role,
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