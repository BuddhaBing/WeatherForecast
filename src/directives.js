(function() {
    
    weatherForecast.directive('forecastPanel', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/daily-forecast.html',
            replace: true,
            scope: {
                day: "=",
                convertDate: "&",
                kelvinToCelcius: "&",
                kelvinToFarenheit: "&",
                convertKelvin: "&",
                degrees: "="
            }
        }
    });

})();
