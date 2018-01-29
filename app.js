var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended:false});

app.use(express.static('public'));

//replacing repition with route instance
//require the route module
var cities = require('./routes/cities');
app.use('/cities', cities);
    

app.listen(process.env.PORT);