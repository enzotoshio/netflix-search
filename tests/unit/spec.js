describe('HomeCtrl', function() {
  beforeEach(module('netSearchApp', 'mockedDashboardJSON'));

  var $controller;
  var $scope = {};
  var $httpBackend;
  var mockedDashboardJSON;

  beforeEach(inject(function(_$controller_, _$httpBackend_, $rootScope, searchJSON, likedMoviesJSON) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();

    $httpBackend.when('GET', 'http://netflixroulette.net/api/api.php?type=json&director=tarantino').respond(searchJSON.fakeData);
    $httpBackend.when('GET', '/movies').respond(likedMoviesJSON.fakeData);
    $httpBackend.when('POST', '/movies').respond(200);
    $httpBackend.when('DELETE', '/movies').respond(200);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('$scope.search', function() {
    beforeEach(function() {
      var controller = $controller('HomeCtrl', {
        $scope: $scope
      });
      $scope.data = {
        filter: 'director',
        search: 'tarantino'
      };

      $scope.search();
      $httpBackend.flush();
    });

    it('should search by director', function() {
      expect($scope.movies.length).toBeGreaterThan(0);
    });

    it('should get user liked movies and match with search response', function() {
      expect($scope.movies[0].liked).toBeDefined();
      expect($scope.movies[0].liked).toBe(true);
    });
  });

  describe('$scope.like', function() {
    beforeEach(function() {
      var controller = $controller('HomeCtrl', {
        $scope: $scope
      });
    });

    it('should POST liked movie', function() {
      var movie = {
        unit: 84,
        show_id: 60032563,
        show_title: "Kill Bill: Vol. 2",
        release_year: "2004",
        rating: "3.8",
        category: "Action & Adventure",
        show_cast: "Uma Thurman, David Carradine, Michael Madsen, Daryl Hannah, Gordon Liu, Michael Parks, Perla Haney-Jardine, Helen Kim, Claire Smithies, Clark Middleton",
        director: "Quentin Tarantino",
        summary: "The Bride has three left on her rampage list: Budd, Elle Driver and Bill himself. But when she arrives at Bill's house, she's in for a surprise.",
        poster: "http://netflixroulette.net/api/posters/60032563.jpg",
        mediatype: 0,
        runtime: "137 min"
      };

      $scope.like(movie);

      expect($httpBackend.flush).not.toThrow();
    });

    it('should DELETE liked movie', function() {
      var movie = {
        unit: 84,
        liked: true,
        show_id: 60032563,
        show_title: "Kill Bill: Vol. 2",
        release_year: "2004",
        rating: "3.8",
        category: "Action & Adventure",
        show_cast: "Uma Thurman, David Carradine, Michael Madsen, Daryl Hannah, Gordon Liu, Michael Parks, Perla Haney-Jardine, Helen Kim, Claire Smithies, Clark Middleton",
        director: "Quentin Tarantino",
        summary: "The Bride has three left on her rampage list: Budd, Elle Driver and Bill himself. But when she arrives at Bill's house, she's in for a surprise.",
        poster: "http://netflixroulette.net/api/posters/60032563.jpg",
        mediatype: 0,
        runtime: "137 min"
      };

      $scope.like(movie);

      expect($httpBackend.flush).not.toThrow();
    });
  });
});