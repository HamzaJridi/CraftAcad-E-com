angular.module('myApp').controller('UsersCtrl',
  ['$scope', '$http',
    function($scope,$http){
      var getUsers = function () {
        $http.get('/users').success(function (response) {
          console.log('I received the data', response);
          $scope.users = response;
          $scope.user = "";
        });
      };
      //invoke the getUsers method to display all the users
      getUsers();

      //add a user method
      $scope.addUser = function () {
        $http.post('/users', $scope.user).success(function (response) {
          getUsers();
        });
      };

      //edit a user method to get the user props in fields
      $scope.editUser = function(id) {
        console.log(id);
        $http.get('/users/' + id).success(function(response) {
          //get the sent back data from the server and put it in the input fields
          $scope.user = response;
        });
      };
      $scope.updateUser = function() {
        console.log($scope.user._id);
        //send to the server the updated user data
        $http.put('/users/' + $scope.user._id, $scope.user)
          .success(function(response) {
            getUsers();
          }
        );
      };

      //delete a user method
      $scope.removeUser = function(id){
        console.log(id);
        //send the user's id to the server
        $http.delete('/users/' + id).success(function(response){
          getUsers();
        });
        getUsers();
      };

      $scope.deselect = function() {
        $scope.user="";
      };
    }]);