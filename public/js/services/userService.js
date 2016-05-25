//Set an angular Service for handling authentication
angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http','$rootScope',
    function ($q, $timeout, $http,$rootScope) {

      // create user variable
      var user = null;
      var admin = null;
      //$rootScope.isAdmin = false;
      // return available functions for use in the controllers
      return ({
        isLoggedIn: isLoggedIn,
        isAdmins : isAdmins,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register,
        adminReg : adminReg
      });

      function isAdmins() {
        if (admin) {
          return true;
        }
        else {
          return false;
        }
      }

      function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
      }

      function getUserStatus() {
        return $http.get('/users/status')
          // handle success
          .success(function (data) {
            if(data.status && !data.administrator){
              user = true;
              admin = false;
            }
            if (data.status && data.administrator) {
              user = true;
              admin = true;
            }
            else {
              user = false;
              admin = false;
            }
          })
          // handle error
          .error(function (data) {
            user = false;
          });
      }

      function login(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/users/login',
          {username: username, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              user = true;
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      }

      function logout() {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('/users/logout')
          // handle success
          .success(function (data) {
            user = false;
            deferred.resolve();
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      }

      function register(firstname,lastname,username,password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/users/register',
          {
            firstname: firstname,
            lastname : lastname,
            username: username,
            password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      }

      function adminReg (firstname,lastname,username,role,password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/admins/register',
          {
            firstname: firstname,
            lastname : lastname,
            username: username,
            role: role,
            password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      }

    }]);