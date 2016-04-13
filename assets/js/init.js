angular
  .module('netflixApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('enterKey', function () {
    return function(scope, element, attrs) {

        element.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;

            // If enter key is pressed
            if (keyCode === 13) {
                event.preventDefault();

                scope.$apply(function() {
                    // Evaluate the expression
                    scope.$eval(attrs.enterKey);
                });

            }
        });
    };
  })
  .directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});