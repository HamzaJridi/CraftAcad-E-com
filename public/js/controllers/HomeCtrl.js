angular.module('myApp')
  .controller('HomeCtrl', function(){
    $( document ).ready(function() {
      $('.carousel').carousel({
        interval: 1000
      })
    });
  });
// Pantallon Controller
//pageControllers.controller('PantCtrl', ['$scope', '$http',
//    function($scope, $http){
//    $http.get('public/data/pantal.json').success(function(pantal){
//        $scope.pantal = pantal;
//    });
//        $(document).ready(function() {
//            $('.thumbnail').click(function(){
//                $('.modal-body').empty();
//                var title = $(this).parent('a').attr("title");
//                $('.modal-title').html(title);
//                $($(this).parents('div').html()).appendTo('.modal-body');
//                $('#myModal').modal({show:true});
//            });
//        });
//}]);
//
//pageControllers.controller('DetailsCtrl', ['$scope', '$http','$routeParams',
//    function($scope, $http, $routeParams){
//    $http.get('data/pantal.json').success(function(pantal){
//        $scope.pantal = pantal;
//        $scope.whichItem = $routeParams.itemId;
//    });
//}]);