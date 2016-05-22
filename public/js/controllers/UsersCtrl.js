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
          console.log(response);
          console.log(response.username);
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


//the details page controller
angular.module('myApp').controller('UserDetailCtrl',
  ['$scope', '$http','$routeParams',
    function($scope, $http, $routeParams) {

      $scope.maxSize = 9;
      $scope.currentPage = 1;
      $scope.totalItems = 0;

      var id = $routeParams.itemId;
      console.log(id);
      $http.get('/users/' + id).success(function (response) {
        $scope.user = response;
        console.log($scope.user);
        console.log($scope.user[0].username);

        //display User's Purchased Products
        $scope.orderedProds = $scope.user[0].purchasedProds;
        console.log('orderedProds are: ', $scope.orderedProds);
        for (var i =0; i<$scope.orderedProds.length; i++) {
          $scope.orderedProd = $scope.orderedProds[i];
          console.log('orderedProd is: ', $scope.orderedProd);
          console.log('orderedProd.date is: ', $scope.orderedProd.date);
          $scope.title = $scope.orderedProd.title
        }

        //display actual Products in user's Cart
        $scope.cartProds = $scope.user[0].cart;
        console.log('cartProds are: ', $scope.cartProds);
        for (var j =0; j<$scope.cartProds.length; j++) {
          $scope.cartProd = $scope.cartProds[j];
          console.log('cartProd is: ', $scope.cartProd);
          console.log('cartProd.title is: ', $scope.cartProd.title);
          $scope.cartTitle = $scope.cartProd.title
        }



      });
    }]);