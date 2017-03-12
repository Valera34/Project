/**
 * Created by Denysenko Ihor on 09.03.17.
 */
exports.mainPage = function(req, res) {
    res.render('index', {
        pageTitle: 'Make Me Be 3D Master'
    });
};

exports.signUpPage = function(req, res) {
    res.render('signup', {
        pageTitle: 'Sign Up'
    });
};

exports.signInPage = function(req, res) {
    res.render('signin', {
        pageTitle: 'Sign In'
    });
};
exports.addModelPage = function(req, res) {
    res.render('addModel', {
        pageTitle: 'New Model'
    });
};