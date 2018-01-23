var express = require('express');
var app = express();
var name = 'Dara';
var d = new Date;

app.use(express.static('public'));

//Create an index route that refers to the following file requirement.
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

//Create a ‘/name’ route that returns your name
app.get('/name', function(req, res){
    res.send(name);
});

//Create a /redirect route that sends you to /surprise with a moved permanently status code
app.get('/redirect', function(req, res){
   res.redirect(301, '/surprise'); 
});

//Create a route that returns the current date. You will need to look up how to get the current date.
app.get('/date', function(req, res) {
    res.send(d);
});

//Create a /cities route in your app.js file with at least 4 cities.
app.get('/cities', function(req, res){
    var cities = ['Providence', 'Boston', 'New York', 'Philadelphia'];
    res.json(cities);
});

app.listen(process.env.PORT);