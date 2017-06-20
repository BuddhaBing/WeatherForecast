var weatherForecast = angular.module('weatherForecast', ['ngRoute', 'ngResource']);

weatherForecast.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
});

weatherForecast.controller('homeController', ['$scope', function($scope) {
    $scope.title = "Home";
}]);

weatherForecast.controller('forecastController', ['$scope', function($scope) {
    $scope.title = "Forecast";
}]);
