/**
 * this controller functionalities are :
 * display all events from the db
 * acces a single event details based on its ID
 * make tha admin able to add, modify and delete events from the events page
 * */

angular.module('myApp').controller('EventsCtrl',
  ['$scope','$http','AuthService',
    function($scope,$http,AuthService){
      $scope.maxSize = 4;
      $scope.currentPage = 1;
      $scope.totalItems = 0;

      /** GET ALL EVENTS */
      //the get all events from the db method
      var getevents = function(){
        $http.get('/events/').success(function (response) {
          console.log('I received the events data', response);
          $scope.events = response;
          $scope.event = "";
        });
      };
      getevents();

      /** ADD A NEW EVENT TO DB */
        //add an event method
      $scope.addEvent = function () {
        $http.post('/events', $scope.event).success(function (response) {
          getevents();
        });
      };

      /** UPDATE AN EVENT */
      //get the event properties in the input fields to update them
      $scope.editEvent = function(id) {
        console.log(id);
        $http.get('/events/' + id).success(function(response) {
          //get the sent back data from the server and put it in the input fields
          $scope.event = response;
        });
      };
      //the update methods that will send the new event properties to the server
      $scope.updateEvent = function() {
        console.log($scope.event._id);
        //send to the server the updated event data
        $http.put('/events/' + $scope.event._id, $scope.event)
          .success(function(response) {
            //Invoke the getevents() method to display the new data after update
            getevents();
          }
        );
      };

      /** DELETE AN EVENT */
        //delete a event method
      $scope.removeEvent = function(id){
        console.log(id);
        //send the event's id to the server
        $http.delete('/events/' + id).success(function(response){
          getevents();
        });
        getevents();
      };

      /** CLEAR INPUT FIELDS */
      //clear the input fieds in case of canceling an event update
      $scope.clearFields = function() {
        $scope.event="";
      };
    }]);