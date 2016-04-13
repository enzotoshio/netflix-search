angular.module('netflixApp')
  .controller('HomeCtrl', function($scope, $http) {
    $scope.data = {
      filter: 'title',
      search: ''
    }

    $scope.movies = [];

    $scope.search = function() {
      var url = 'http://netflixroulette.net/api/api.php?type=json',
        filter = $scope.data.filter,
        search = $scope.data.search;

        url += '&' + filter+ '=' + search;

      $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
        $scope.movies = response.data;
      }, function errorCallback(response) {
        $scope.movies = 'Not Found';
      });
    };
  });