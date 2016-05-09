angular.module('myApp')
  .controller('HomeCtrl', function(){
    $( document ).ready(function() {
      $('.carousel').carousel({
        interval: 1000
      })
    });
  });
