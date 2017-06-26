(function() {
    
    weatherForecast.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
        $scope.city = "";
        $scope.setCity = function() {
            cityService.setCity($scope.city);
            $location.path( '/forecast/days/10/Celsius' );
        };
    }]);
    
    weatherForecast.controller('forecastController', ['$scope', '$resource', '$location', '$routeParams', 'weatherService', 'cityService', 'conversionService', function($scope, $resource, $location, $routeParams, weatherService, cityService, conversionService) {
        $scope.city = cityService.getCity();
        $scope.conversionService = conversionService;
        $scope.weatherResult = JSON.parse(localStorage.getItem('forecast'));

        var trimArray = function() {
            $scope.results = $scope.weatherResult;
            var days = $routeParams.numberOfDays
            var toDelete = ($scope.weatherResult.length) - (days - 1);
            $scope.results.splice(days, toDelete);
        }

        if( !$scope.weatherResult || weatherService.isWeatherExpired()) {
            weatherService.getForecast({ q: $scope.city, cnt: 10, APPID: 'eb9c8de257842ab82905633450634394' }).then(function(result) {
                $scope.weatherResult = result.data.list;
                var oneDay = new Date();
                oneDay.setHours(0,0,0,0);
                oneDay.setHours(oneDay.getHours() + 24);
                localStorage.setItem('expires', oneDay);
                localStorage.setItem('forecast', JSON.stringify($scope.weatherResult));
            });
        }

        $scope.setDegrees = function() {
            return ($routeParams.format === "Farenheit") ? "F" : "C";
        }

        $scope.degrees = $scope.setDegrees();

        trimArray();

        $scope.showDays = function(num) {
            $location.path( '/forecast/days/' + num + '/' + $routeParams.format);
        }

        $scope.isChecked = function(num) {
            return num === $routeParams.numberOfDays;
        }

        $scope.tempFormat = function(format) {
            return format === $routeParams.format;
        }

        $scope.changeFormat = function(format) {
            $location.path( '/forecast/days/' + $routeParams.numberOfDays + '/' + format);
        }
        
    }]);

})();
