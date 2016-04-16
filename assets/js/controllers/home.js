angular.module('netSearchApp')
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
        url += '&' + filter + '=' + search;

        $http({
          method: 'GET',
          url: url
        }).then(function successCallback(response) {
          $scope.getUserLikes(response.data);
        }, function errorCallback(response) {
          $scope.movies.message = ['Not Found'];
        });
      } else {
        $scope.movies.message = [
          'Unfortunately we can\'t search by all movies.',
          'Type something in the search field.'
        ];
      }
    };

    $scope.getUserLikes = function(movies) {
      $http({
        method: 'GET',
        url: '/movies'
      }).then(function successCallback(response) {
        $scope.matchLikes(movies, response.data);
        $scope.movies.message = [];
      }, function errorCallback(response) {
        $scope.matchLikes(movies, []);
        $scope.movies.message = [];
      });
    };

    $scope.matchLikes = function(movies, likedMovies) {
      movies.forEach(function(movie) {
        likedMovies.forEach(function(liked) {
          if (movie.show_title === liked.show_title) {
            movie.liked = true;
          }
        });
      });

      $scope.movies = movies;
    };

    $scope.like = function(movie) {
      var method = 'POST';

      delete movie.unit;
      delete movie.$$hashKey;

      if (movie.liked) {
        method = 'DELETE';
        movie.liked = false;
      } else {
        movie.liked = true;
      }

      $http({
        method: method,
        url: '/movies',
        data: {
          like: movie
        }
      });
    };
  });