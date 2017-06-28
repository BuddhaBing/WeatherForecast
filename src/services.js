(function() {
    
    weatherForecast.service('cityService', [function() {
        var city = "";
        
        return {
            setCity: function(val) {
                city = val || city;
            },
            getCity: function() {
                return city;
            }
        }
    }]);

    weatherForecast.service('weatherService', ['$http', 'errorService', function($http, errorService) {
        var service = {};
        service.weatherResult = {};
        
        service.getForecast = function(city) {
            var params = {
                url: 'http://api.openweathermap.org/data/2.5/forecast/daily', 
                method: "GET",
                params: { q: city, cnt: 10, APPID: 'eb9c8de257842ab82905633450634394' }
            };
            return $http(params)
                .then(function(result) {
                    service.weatherResult = result.data.list;
                    service.weatherResult.city = result.data.city.name + ', ' + result.data.city.country;
                    service.storeWeather(city, service.weatherResult);
                    return true;
                })
                .catch(function(error) {
                    errorService.handleError(error);
                    return false;
                });
        }

        service.storeWeather = function(city, forecast) {
            var oneDay = new Date();
            oneDay.setHours(0,0,0,0);
            oneDay.setHours(oneDay.getHours() + 24);
            localStorage.setItem('city', city);
            localStorage.setItem('expires', oneDay);
            localStorage.setItem('forecast', JSON.stringify(forecast));
        }

        service.isWeatherExpired = function(city) {
            var expiryDate = localStorage.getItem('expires');
            var prevSearchedCity = localStorage.getItem('city');
            var today = new Date();
            today.setHours(0,0,0,0);
            return city != prevSearchedCity || new Date(expiryDate) <= new Date(today);
        }

        service.isMatchingCity = function(city) {
            if (this.weatherResult.city) {
                var searchedCity = city.toLowerCase();
                var foundCity = this.weatherResult.city.toLowerCase();
                return foundCity.includes(searchedCity);
            }
        }

        return service;
    }]);

    weatherForecast.service('conversionService', ['$http', '$routeParams', function($http, $routeParams) {
        var service = {};
        
        service.kelvinToFarenheit = function(degK) {
            return Math.round((1.8 * (degK - 273)) + 32);
        }
        
        service.kelvinToCelsius = function(degK) {
            return Math.round(degK - 273);
        }

        service.convertDate = function(dt) {
            return new Date(dt * 1000);
        }

        service.convertKelvin = function(degK) {
            if ($routeParams.format === "Farenheit")
                return Math.round((1.8 * (degK - 273)) + 32);
            return Math.round(degK - 273);
        }

        return service;
    }]);

    weatherForecast.service('errorService', ['$location', function($location) {
        var service = {};
        service.errors = [];

        service.handleError = function(err) {
            if (err.status == 404) {
                return service.error = "City not be found!";
            }
        }

        return service;
    }]);

})();
