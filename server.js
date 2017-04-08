// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var path = require('path');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

const MongoStore = require('connect-mongo')(express);

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ 
        secret: 'loveprogramming',
        cookie:{
            maxAge : 360000 // one hour in millis
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection })
                            })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(express.static(path.join(__dirname, 'views')));

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(8080);
console.log('The magic happens on port ' + port);
