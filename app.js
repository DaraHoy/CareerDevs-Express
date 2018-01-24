var express = require('express');
var app = express();

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
    'Newyork': "New York",
    'Philidelphia': "Pennsylvania",
    'Washington': "The U.S. capital, bordering the states of Maryland and Virginia."
};

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