/**
 * Created by Denysenko Ihor on 09.03.17.
 */
exports.mainPage = function(req, res) {
    res.render('index', {
        pageTitle: 'Make Me Be 3D Master'
    });
};

exports.addModelPage = function(req, res) {
    res.render('addModel', {
        pageTitle: 'New Model'
    });
};

