(function() {
    
    weatherForecast.controller('homeController', ['$scope', '$location', 'cityService', 'weatherService', 'errorService', function($scope, $location, cityService, weatherService, errorService) {
        $scope.city = "";
        $scope.$watch('error');
        
        $scope.setCity = function() {
            cityService.setCity($scope.city, weatherService.getForecast($scope.city)
                .then(function(res) {
                    if (res) return $location.path( '/forecast/days/10/Celsius' );
                    $scope.error = errorService.error;
                })
            );
        };
    }]);
    
    weatherForecast.controller('forecastController', ['$scope', '$resource', '$location', '$routeParams', 'weatherService', 'cityService', 'conversionService', 'errorService', function($scope, $resource, $location, $routeParams, weatherService, cityService, conversionService, errorService) {
        $scope.city = cityService.getCity();
        $scope.foundCity = weatherService.weatherResult.city;
        $scope.conversionService = conversionService;
        $scope.weatherResult = JSON.parse(localStorage.getItem('forecast'));
        $scope.degrees = $routeParams.format[0];
        $scope.unitsOfMeasurement = ['Celsius', 'Farenheit']

        var trimArray = function() {
            $scope.results = $scope.weatherResult;
            var days = $routeParams.numberOfDays;
            var toDelete = ($scope.weatherResult.length) - (days - 1);
            $scope.results.splice(days, toDelete);
        }

        if( !$scope.weatherResult || weatherService.isWeatherExpired($scope.city)) {
            weatherService.getForecast($scope.city).then(
                function(result) {
                    $scope.weatherResult = result.data.list;
                }
            );
        }

        $scope.showDays = function(num) {
            $location.path( '/forecast/days/' + num + '/' + $routeParams.format);
        }

        $scope.isChecked = function(num) {
            return num === $routeParams.numberOfDays;
        }

        $scope.checkTempFormat = function(format) {
            return format == $routeParams.format;
        }

        $scope.changeFormat = function(format) {
            $location.path( '/forecast/days/' + $routeParams.numberOfDays + '/' + format);
        }

        $scope.isMatchingCity = function() {
            return weatherService.weatherResult.city.includes($scope.city);
        }

        trimArray();
        
    }]);

})();
