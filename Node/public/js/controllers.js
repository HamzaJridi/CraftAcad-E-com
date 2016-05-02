myApp.controller('ArticleCtrl', ['$scope', '$http','$routeParams', function ($scope, $http,$routeParams) {
    $http.get('/articles').success(function (response) {
        $scope.message='angular in articles page'
        $scope.articles = response;
    });
    var id = $routeParams.itemId;

        $http.get('/articles/'+id).success(function (response) {
            $scope.article = response;
        });
    }]);
