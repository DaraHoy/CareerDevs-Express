var express = require('express');
var app = express();
var name = 'Dara';
var d = new Date;

app.get('/', function(req, res){
    res.send('hello world');
});
app.get('/name', function(req, res){
    res.send(name);
});

app.get('/redirect', function(req, res){
   res.redirect(301, '/surprise'); 
});

app.get('/date', function(req, res) {
    res.send(d);
})



app.listen(process.env.PORT);