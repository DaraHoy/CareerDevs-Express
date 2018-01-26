var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended:false});

app.use(express.static('public'));

//normalize the data sent in the /cities route.
//normalizing of the data should use a middleware function.
app.param('city', function(req,res,next){
    var city = req.params.city;
    var state = city[0].toUpperCase() + city.slice(1).toLowerCase();
    
    req.stateName = state;
    next();
});

var cities = {
    'Providence': "Rhode Island",
    'Boston': "Massachusetts",
    'Orlando': "Florida",
    'Philidelphia': "Pennsylvania",
    'Washington': "The U.S. capital, bordering the states of Maryland and Virginia."
};

app.post('/cities', parseUrlencoded, function(req, res){
    var newCity = req.body //returns form data
    if(newCity.city.length < 4){
        res.status(400).json("Invalid city sumbission, city must have be at least 4 characters");
    } else if (newCity.state.length < 2) {
        res.status(400).json("Invalid state sumbission, state must have be at least 2 characters");
    } else {
        cities[newCity.city] = newCity.state; //adds new city to cities object
        res.status(201).json(newCity.city);
    }
});

//A '/cities' route that will display all cities. (minimum of 5 cities)
app.get('/cities', function(req, res){
    if (req.query.limit >= 1) { 
        res.json(cities.slice(0, req.query.limit));
    } 
//Return a status error if the limit is higher than the number of cities available in the list
    else if(req.query.limit > cities.length) {
        res.status(404, 'query limit is higher than the number of cities available');
//All cities if 0 is provided or if limit query is omitted 
    } else {
        res.json(Object.keys(cities));
    }
});
//Add a dynamic route to /cities. This should respond with the state that the city resides in.
app.get('/cities/:city', function (req, res){
    var state = cities[req.stateName];
    //Dynamic route should return Not Found status code if the requested city is not available.
    if (!state) {
        res.status(404).json("No city found for " + req.params.city);
    } else {
        res.json(state);
    }
});

app.listen(process.env.PORT);