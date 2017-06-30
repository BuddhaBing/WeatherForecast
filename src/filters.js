weatherForecast.filter('convertKelvin', [ '$routeParams', function($routeParams) {

  return function(degK) {

    if (isNaN(degK)) return degK;

    if ($routeParams.format === "Farenheit")
        return Math.round((1.8 * (degK - 273)) + 32);
    return Math.round(degK - 273);
    
  }

}]);

weatherForecast.filter('kelvinToFarenheit', [ function() {

  return function(degK) {

    if (isNaN(degK)) return degK;
    return Math.round((1.8 * (degK - 273)) + 32);
    
  }

}]);

weatherForecast.filter('kelvinToCelsius', [ function() {

  return function(degK) {

    if (isNaN(degK)) return degK;
    return Math.round(degK - 273);
    
  }

}]);

weatherForecast.filter('convertDate', [ function() {

  return function(dt) {

    if (isNaN(dt)) return dt;
    return new Date(dt * 1000);
    
  }

}]);
