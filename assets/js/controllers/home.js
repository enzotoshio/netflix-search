angular.module('netflixApp')
  .controller('MainCtrl', function($scope, $http) {
    var self = this;
    this.page = this.page || -1;

    this.get = function() {
      self.page++;
      var offset = 4 * self.page;
      $http({
        method: 'GET',
        url: 'http://api.giphy.com/v1/gifs/search?q=programmers&api_key=dc6zaTOxFJmzC&limit=4&offset=' + offset
      }).then(function successCallback(response) {
        $scope.gifs = response.data.data;
      }, function errorCallback(response) {
      });
    };

    this.get();

    // setInterval(this.get, 20000);
  });