var express = require('express');
var compress = require('compression');
var app = express();

//var oneDay = 86400000;

app.use(compress());

app.use(express.static(__dirname + '/app' /*, { maxAge: oneDay }*/));
app.use('/bower_components', express.static(__dirname + '/bower_components' /*, { maxAge: oneDay }*/));

app.listen(process.env.PORT || 3000);