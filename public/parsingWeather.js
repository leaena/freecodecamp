var temp;
var loading = new Skycons({'color': 'snow'});
loading.add('loading', 'clear-day');
loading.play();

function weatherAlerts(alerts){
  if(!alerts.length){ return; }
  var alertDivs = $();
  alerts.forEach(function(alert) {
    alertDivs = alertDivs.add($('<div class="danger">' +
    '<a href="'+ alert.uri + '" target="_blank">' + alert.title + '</a>' +
    '</div>'));
  });
  $('#weather-alert').append(alertDivs);
}

function weatherIcon(icon){
  var skycons = new Skycons({'color': 'snow'});
  skycons.add('weather-icon', icon);
  skycons.play();
}

function weatherSummary(summary){
  $('#weather-summary').text(summary);
}

function weatherTemp(temperature){
  temp = parseInt(temperature);
  $('#weather-temp').text(temp);
  $('#weather-degree').html('&deg;');
  $('#weather-units').text('F');
}

function getWeather(lat, long){
  $.getJSON('api/weather/' + lat + '/' + long, function (data) {
    $('#loading').remove();
    weatherAlerts(data.alerts);
    weatherIcon(data.currently.icon);
    weatherSummary(data.currently.summary);
    weatherTemp(data.currently.temperature);
  });
}

function successGeo(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  getWeather(lat, long);
}

$(function () {
  $('#weather-units').click(function(e) {
    e.preventDefault();
    var unitType = $(this).text();
    var $temp = $('#weather-temp');
    var temp = parseInt($temp.text());

    if(unitType === 'F'){
      $temp.text(parseInt((temp - 32) / 1.8));
      $(this).text('C');
    } else {
      $temp.text(parseInt(temp * 1.8 + 32));
      $(this).text('F');
    }
});
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successGeo);
  } else {
      alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
  }
});
