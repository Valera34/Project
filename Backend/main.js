var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    var pages = require('./pages');
 
    //Сторінки
    //Головна сторінка
    app.get('/', pages.mainPage);

    //Сторінка реєстрації
    app.get('/signup.html', pages.signUpPage);
    
    //Сторінка валідації
    app.get('/signin.html', pages.signInPage);
    
     //Сторінка створення нової моделі
    app.get('/addModel.html', pages.addModelPage);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/MainPage/index')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    
    app.use(express.static(path.join(__dirname, 'css')));

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