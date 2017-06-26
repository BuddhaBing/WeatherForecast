(function() {
    
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

    weatherForecast.service('weatherService', function($http) {
        var service = {};
        service.getForecast = function(params) { 
            return $http({
                url: 'http://api.openweathermap.org/data/2.5/forecast/daily', 
                method: "GET",
                params: params
            })
        }

        service.isWeatherExpired = function() {
            var expiryDate = localStorage.getItem('expires');
            var today = new Date();
            today.setHours(0,0,0,0);
            return new Date(expiryDate) <= new Date(today);
        }

        return service;
    });

    weatherForecast.service('conversionService', function($http, $routeParams) {
        var service = {};
        
        service.kelvinToFarenheit = function(degK) {
            return Math.round((1.8 * (degK - 273)) + 32);
        }
        
        service.kelvinToCelcius = function(degK) {
            return Math.round(degK - 273);
        }

        service.convertDate = function(dt) {
            return new Date(dt * 1000);
        }

        service.convertKelvin = function(degK) {
            if($routeParams.format === "Farenheit") {
                return Math.round((1.8 * (degK - 273)) + 32);
            } else {
                return Math.round(degK - 273);
            }
        }

        return service;
    });

})();
