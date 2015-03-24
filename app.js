var express = require ('express');
var bodyParser = requre ('body-parser');
var swig = requre ('swig');
var logger = require ('morgan')('dev');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(1337, function () {
	console.log('Starting server');
});