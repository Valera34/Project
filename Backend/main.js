var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var storage = require('node-persist');

exports.storage=storage;

storage.init({
    dir: 'Backend/Database',

    stringify: JSON.stringify,

    parse: JSON.parse,

    encoding: 'utf8',

    logging: false,  // can also be custom logging function

    continuous: true, // continously persist to disk

    interval: false, // milliseconds, persist to disk on an interval

    ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS

    expiredInterval: 2 * 60 * 1000, // [NEW] every 2 minutes the process will clean-up the expired cache

    // in some cases, you (or some other service) might add non-valid storage files to your
    // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
    forgiveParseErrors: false // [NEW]

});




function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');
    
 
    //Сторінки
    //Головна сторінка
    app.get('/', pages.mainPage);
    
    
    //запит на створення нового користувача
    app.post('/api/signup/', api.signUp);
    
    //запит на аутентифікацію
    app.post('/api/signin/', api.signIn);
    
    //Сторінка реєстрації
    app.get('/signup.html', pages.signUpPage);
    
    //Сторінка валідації
    app.get('/signin.html', pages.signInPage);
    
     //Сторінка створення нової моделі
    app.get('/addModel.html', pages.addModelPage);

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
        console.log('Project running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;
