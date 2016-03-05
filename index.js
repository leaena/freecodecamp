var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var favicon = require('serve-favicon');
var dotenv = require('dotenv');

dotenv.load();

var app = express();
var weather = require('./api/weather');

app.set('port', (process.env.PORT || 5000));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use('/api/weather', weather);

app.get('/', function(req, res){
   res.render('index.html');
});


app.listen(app.get('port'), function (){
  console.log('Listening on ' + app.get('port'));
});
