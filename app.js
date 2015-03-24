var express = require ('express');
var bodyParser = require ('body-parser');
var swig = require ('swig');
var logger = require ('morgan')('dev');
var routes = require('./routes/index');
var sassMiddleware = require('node-sass-middleware');

var app = express();

// Swig Setup
swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);

//sass middleware
app.use(sassMiddleware({
    src: __dirname + '/assets',
    dest: __dirname + 'public',
    debug: true,
    // outputStyle: 'compressed',
    // prefix:  '/prefix'
}));

//logger
app.use(logger);

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//routes
app.use('/', routes);

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into next())
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render( 'error' );
});

app.listen(1337, function () {
	console.log('Starting server');
});
