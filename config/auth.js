// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1193463964099876', // your App ID
		'clientSecret' 	: 'c83d35d00ea389f3d21e72b47ea9f432', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
        
	}

};