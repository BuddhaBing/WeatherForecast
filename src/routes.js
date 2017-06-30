(function() {
    
    weatherForecast.config(function($routeProvider) {
        $routeProvider
            .when('/forecast', {
                templateUrl: 'pages/forecast.html',
                controller: 'ForecastController'
            })
            .when('/forecast/days/:numberOfDays', {
                templateUrl: 'pages/forecast.html',
                controller: 'ForecastController'
            })
            .when('/forecast/days/:numberOfDays/:format', {
                templateUrl: 'pages/forecast.html',
                controller: 'ForecastController'
            })
            .otherwise({
                templateUrl: 'pages/home.html',
                controller: 'HomeController'
            })

    });

})();
    