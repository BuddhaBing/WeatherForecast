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
            .when('/forecast/days/:numberOfDays', {
                templateUrl: 'pages/forecast.html',
                controller: 'forecastController'
            })
    });
    
    weatherForecast.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
        $scope.city = "";
        $scope.setCity = function() {
            cityService.setCity($scope.city);
            $location.path( '/forecast' );
        };
    }]);
    
    weatherForecast.controller('forecastController', ['$scope', '$resource', '$location', '$routeParams', 'weatherService', 'cityService', function($scope, $resource, $location, $routeParams, weatherService, cityService) {
        $scope.city = cityService.getCity();

        $scope.weatherResult = JSON.parse(localStorage.getItem('forecast'));

        var isExpired = function() {
            var expiryDate = localStorage.getItem('expires');
            var today = new Date();
            today.setHours(0,0,0,0);
            return expiryDate <= today;
        }

        if( !$scope.weatherResult || isExpired()) {
            weatherService.getForecast({ q: $scope.city, cnt: 10, APPID: 'eb9c8de257842ab82905633450634394' }).then(function(result) {
                $scope.weatherResult = result.data.list;
                var oneDay = new Date();
                oneDay.setHours(0,0,0,0);
                oneDay.setHours(oneDay.getHours() + 24);
                localStorage.setItem('expires', oneDay);
                localStorage.setItem('forecast', JSON.stringify($scope.weatherResult));

            });
        }

        var trimArray = function() {
            $scope.results = $scope.weatherResult;
            var days = $routeParams.numberOfDays
            var toDelete = ($scope.weatherResult.length) - (days - 1);
            $scope.results.splice(days, toDelete);
        }

        trimArray();

        $scope.convertToFarenheit = function(degK) {
            return Math.round((1.8 * (degK - 273)) + 32);
        }
        
        $scope.convertToCelcius = function(degK) {
            return Math.round(degK - 273);
        }

        $scope.convertDate = function(dt) {
            return new Date(dt * 1000);
        }

        $scope.showDays = function(num) {
            $location.path( '/forecast/days/' + num);
        }

        $scope.isChecked = function(num) {
            return num.toString() === $routeParams.numberOfDays;
        }
        
    }]);
    
    weatherForecast.service('weatherService', function($http) {
        var service = {};
        service.getForecast = function(params) { 
            return $http({
                url: 'http://api.openweathermap.org/data/2.5/forecast/daily', 
                method: "GET",
                params: params
            })
        }
        return service;
    });

    weatherForecast.service('cityService', function() {
        var city = city || "London";
        
        return {
            setCity: function(val) {
                city = val || city;
            },
            getCity: function() {
                return city;
            }
        }
    });

    weatherForecast.directive('forecastPanel', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/daily-forecast.html',
            replace: true,
            scope: {
                day: "=",
                convertDate: "&",
                convertToCelcius: "&",
                convertToFarenheit: "&"
            }
        }
    });
    
})();
