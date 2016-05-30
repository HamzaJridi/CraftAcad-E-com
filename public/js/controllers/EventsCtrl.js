/**
 * this controller functionalities are :
 * display all events from the db
 * acces a single event details based on its ID
 * make tha admin able to add, modify and delete events from the events page
 * */

angular.module('myApp').controller('EventsCtrl', ['$scope', '$http', 'AuthService',
    function ($scope, $http, AuthService) {
    $scope.maxSize = 4;
    $scope.currentPage = 1;
    $scope.totalItems = 0;

    /** GET ALL EVENTS */
    //the get all events from the db method
    var getevents = function () {
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
    $scope.editEvent = function (id) {
      console.log(id);
      $http.get('/events/' + id).success(function (response) {
        //get the sent back data from the server and put it in the input fields
        $scope.event = response;
      });
    };
    //the update methods that will send the new event properties to the server
    $scope.updateEvent = function () {
      console.log($scope.event._id);
      //send to the server the updated event data
      $http.put('/events/' + $scope.event._id, $scope.event)
        .success(function (response) {
          //Invoke the getevents() method to display the new data after update
          getevents();
        });
    };

    /** DELETE AN EVENT */
    //delete a event method
    $scope.removeEvent = function (id) {
      console.log(id);
      //send the event's id to the server
      $http.delete('/events/' + id).success(function (response) {
        getevents();
      });
      getevents();
    };

    /** CLEAR INPUT FIELDS */
    //clear the input fieds in case of canceling an event update
    $scope.clearFields = function () {
      $scope.event = "";
    };

    //disabe the dates before today
    $scope.minDate = new Date();
    }]);

//the event details page controller
angular.module('myApp').controller('EventDetailCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
    var id = $routeParams.itemId;
    console.log(id);
    $http.get('/events/' + id).success(function (response) {
      $scope.event = response;
      console.log('$scope.event: ', $scope.event);

      //display the list of visitors in an event
      $scope.visitors = $scope.event.listOfVisitors;
      console.log('the visitors are: ', $scope.visitors);
      for (var i = 0; i < $scope.visitors.length; i++) {
        $scope.visitor = $scope.visitors[i];
        console.log('visitor is: ', $scope.visitor);
        console.log('visitors.name is: ', $scope.visitor.username);
      }
    });

    /** Subscribe IN AN EVENT */
    // Subscribe in an Event
    $scope.subscribe = function () {
      //get the user session
      $http.get('/users/session').success(function (response) {
        //get the user data
        $http.get('/users/' + response._id).success(function (user) {
          console.log("the user is : ", user[0]);
          //get the event data
          $http.get('/events/' + id).success(function (event) {
            $scope.event = event;
            console.log("the $scope.event is : ", $scope.event);
            //test if the listOfVisitors array is empty then subs the user
            if ($scope.event.listOfVisitors.length === 0) {
              $http.put('/events/' + $scope.event._id + '/subscribe/' + user[0]._id + '/' + user[0].username).success(function (res) {
                $scope.event.maxVisitors--;
                console.log('max Visitors before update: ', $scope.event.maxVisitors);
                $http.put('events/' + event._id, $scope.event).success(function (res) {
                  console.log('max Visitors after update: ', $scope.event.maxVisitors);
                  console.log("You are subscribed Successfully ");
                  $scope.successsub = 'You are subscribed Successfully';
                });
              });
              //if the listOfVisitors array is not empty
            } else {
              var userExist = 0;
              //  //fetch listOfVisitors to see if the user already subscribed
              for (var k = 0; k < $scope.event.listOfVisitors.length; k++) {
                console.log('event.listOfVisitors[k] is : ', event.listOfVisitors[k]);
                if ($scope.event.listOfVisitors[k].userId === user[0]._id) {
                  userExist++;
                }
                console.log('userExist = : ', userExist);
              } // for Loop
              if (userExist === 0) {
                $http.put('/events/' + $scope.event._id + '/subscribe/' + user[0]._id + '/' + user[0].username).success(function (res) {
                  $scope.event.maxVisitors--;
                  console.log('max Visitors before update: ', $scope.event.maxVisitors);
                  $http.put('events/' + event._id, $scope.event).success(function (res) {
                    console.log('max Visitors after update: ', $scope.event.maxVisitors);
                    console.log("You are subscribed Successfully ");
                    $scope.successsub = 'You are subscribed Successfully';
                  });
                });
              } else {
                console.log('Sorry, you are already sybscribed');
                $scope.failsub = 'Sorry, you are already subscribed to this event';
              }
            }
          });
        });
      });
    }; //the subscribe method

    }]);