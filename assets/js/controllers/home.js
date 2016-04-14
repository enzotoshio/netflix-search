angular.module('netflixApp')
  .controller('HomeCtrl', function($scope, $http) {
    $scope.movies = [];
    $scope.movies.message = ['Search any movie or director.'];

    $scope.data = {
      filter: 'title',
      search: ''
    }

    $scope.search = function() {
      var url = 'http://netflixroulette.net/api/api.php?type=json',
        filter = $scope.data.filter,
        search = $scope.data.search;

      $scope.movies = [];
      $scope.searched = true;
      $scope.movies.message = ['Searching...'];

      if (search) {
        url += '&' + filter+ '=' + search;

        $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
          $scope.movies = response.data;
        }, function errorCallback(response) {
          $scope.movies.message = 'Not Found';
        });
      } else {
        $scope.movies.message = [];
        $scope.movies.message[0] = 'Unfortunately we can\'t search by all movies.';
        $scope.movies.message[1] = 'Type something in the search field.';
      }
    };

    $scope.like = function (movie){
      delete movie.unit;
      delete movie.$$hashKey;

      $http({
          method: 'POST',
          url: '/movies',
          data: {
            like: movie
          }
        }).then(function successCallback(response) {
          $scope.movies = response.data;
        }, function errorCallback(response) {
          $scope.movies.message = 'Not Found';
        });
    };
  });