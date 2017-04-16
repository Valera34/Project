var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

 var fs = require('fs');


var storage = require('node-persist');

storage.init({
	dir:'app/storage',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,  // can also be custom logging function
    continuous: true, // continously persist to disk
    interval: false, // milliseconds, persist to disk on an interval
    ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS
    expiredInterval: 2 * 60 * 1000, // [NEW] every 2 minutes the process will clean-up the expired cache
    forgiveParseErrors: false // [NEW]
});

// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

    app.get('/get-model-list/', function(req,res){
        
        if(!storage)
         return res.status(400).send('storage is undefined.');
        
        var model_list=[];
        
        storage.getItem('listOfModels',function(err,value){
  
        model_list = value;
        
        res.send(model_list);
        
        });
   
        
    });
	
	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
    
     app.get('/profile/addModel', isLoggedIn, function(req, res) {
        res.render('addModel.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
    //create model
     
    
     app.post('/profile/addModel/createModel',isLoggedIn, function(req,res){
        
         
         var form = new formidable.IncomingForm();
         form.uploadDir=__dirname+'/uploads';
         
         
         var name;
         var description;
         
         
          form.parse(req, function (err, fields, files) {
        
             name= fields.name;
             description=fields.description;
           // console.log(name, description);
         
         if (!name)
    return res.status(400).send('No name has been written.');
    
         
         if (!description)
    return res.status(400).send('No description has been written.');
        
         
   // console.log("Creating new model, deploy to database", model_info);
         
         if(!storage)
             return res.status(400).send('Not init storage.');
        
         
         
         var IsWritten=false;
   
          var temp=[];
         
         storage.getItem('listOfModels',function(err,value){
                         
                         
                         if(value){
                            IsWritten=true;
                            temp=value;
             
             var lengthOfStore=temp.length;                     
                             
    var model_data={
        
        name: name,
        description: description,
        file_id:lengthOfStore
        
    }
    
   temp.push(model_data);
             
             console.log(temp);
    
    storage.setItem('listOfModels',temp);
          
    res.redirect('/profile');
                    
                            }else{
        var lengthOfStore=0;
                                
        var model_data={
        
        name: name,
        description: description,
        file_id:lengthOfStore
        
    }
    
   temp.push(model_data);
    
    storage.setItem('listOfModels',temp);
          
    res.redirect('/profile');
                            }
                         });
               
               
               
               
           }); 
    
         
         
           form.on('file', function(field, file) {
                    //rename the incoming file to the file's name
                    console.log('FORM ON');
                    
               storage.getItem('listOfModels',function(err,value){
              
                    var len = value.length;
               
                   fs.rename(file.path, form.uploadDir + "/" +len+'.fbx');
               });
               
               
                    
          });
         
      
        
          
    });
    
    
    
	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email',session:true }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
            session:true,
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

