angular.module('canalapp').controller('About', ['$scope', '$compile', '$q', 'ckConsole', '$route', '$routeParams', '$location', function($scope, $compile, $q, ckConsole, $route, $routeParams, $location){
  scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;

  $scope.backToMap = function(){
    $location.path('/map');
  };

  console.log("Funziona?");
}