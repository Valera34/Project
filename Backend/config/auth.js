// expose our config directly to our application using module.exports
module.exports = {
    
    'googleAuth' : {
        'clientID'      : '535702972121-1ta67dder08o8i103a60f0jss5im16of.apps.googleusercontent.com',
        'clientSecret'  : 'iL4o2VRJ7GPcwoWvtAHH7KQZ',
        'callbackURL'   : 'http://'+process.env.PORT+'/auth/google/callback'
    }

};