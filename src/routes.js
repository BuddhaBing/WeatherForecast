(function() {
    
    weatherForecast.config(function($routeProvider) {
        $routeProvider
            .when('/forecast', {
                templateUrl: 'pages/forecast.html',
                controller: 'forecastController'
            })
            .when('/forecast/days/:numberOfDays', {
                templateUrl: 'pages/forecast.html',
                controller: 'forecastController'
            })
            .when('/forecast/days/:numberOfDays/:format', {
                templateUrl: 'pages/forecast.html',
                controller: 'forecastController'
            })
            .otherwise({
                templateUrl: 'pages/home.html',
                controller: 'homeController'
            })

    });

})();
    