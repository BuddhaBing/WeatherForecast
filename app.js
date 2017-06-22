(function(){
    
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
    
    weatherForecast.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
        $scope.setCity = function() {
            cityService.setCity($scope.city);
        };
    }]);
    
    weatherForecast.controller('forecastController', ['$scope', 'cityService', function($scope, cityService) {
        $scope.city = cityService.getCity();
    }]);
    
    weatherForecast.service('cityService', function() {
        var city = "London";
        
        return {
            setCity: function(val) {
                city = val || city;
            },
            getCity: function() {
                return city;
            }
        }
    });
    
})();
