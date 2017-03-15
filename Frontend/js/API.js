var API_URL = "http://localhost:5050";

var isSigned;


function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}


createPerson = function(person, callback) {
   
    backendPost("/api/signup/", person, callback);
};

signPerson = function(person, callback) {
   
    backendPost("/api/signin/", person, callback);
};


function sendData() {
    
        var person = {
        name: $('#inputName').val(),
        email: $('#inputEmail').val(),
        pass: $('#inputPassword').val(),
        confpass: $('#confinputPassword').val()
    }
           
    createPerson(person, callback);
        
    function callback(err,res){
        if(err){
            console.log(err);
        }
       
        return res;
    }
           
   
}


function signUp(){
      
    sendData();
           
}

function signIn(){
    
    signinToSite();
    
}



function signinToSite(){
    
      var person = {
        email: $('#inputEmail').val(),
        pass: $('#inputPassword').val()
    }
    
    signPerson(person, callback);
        
    function callback(err,res){
        if(err){
            console.log(err);
        }
        
        return res;
    }
    
    
}

