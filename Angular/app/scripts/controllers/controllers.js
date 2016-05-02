myApp.controller('ArticleCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('$articles').success(function (response) {
        $scope.message='angular in articles page'
        $scope.articles = response;
    })
}])