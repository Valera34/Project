
var path = require('path');
var morgan = require('morgan');
var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api'); 
    
     app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    
    module.exports = function(app, passport) {
    
        
         // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
                
    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    
     app.get('/addModel.html',isLoggedIn, pages.addModelPage);
        
    
    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

   

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

    };

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
    
   

    //Якщо не підійшов жоден url
    app.use(express.static(path.join(__dirname, '../Frontend/MainPage/index')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();
    
    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    
    app.use(express.static(path.join(__dirname, 'css')));
    
    app.use(express.static(path.join(__dirname, '../Frontend/js')));

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('Project running on http://localhost:'+ process.env.PORT||port+'/');
    });
}

exports.startServer = startServer;
