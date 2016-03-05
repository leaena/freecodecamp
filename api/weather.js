var express = require('express');
var router = express.Router();
var request = require('request');


var forecastKey = process.env.FORECAST_KEY;

router.get('/', function(req, res){
  res.status(400).send({errors: 'Latitude and longitude required.'});
});
// API request to forecast.io to get current weather
router.get('/:lat/:long', function(req, res) {
  var url = 'https://api.forecast.io/forecast/' + forecastKey;
  url += '/' + req.params.lat;
  url += ',' + req.params.long;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send({errors: 'Unknown error occured.'});
    }
  });
});

module.exports = router;
