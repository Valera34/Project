/**
 * Created by Denysenko Ihor on 13.03.2017.
 */

var API_URL = "http://localhost:5050";

var main=require('./main');
var storage = main.storage;


exports.signUp = function(req, res) {
    
    var RegistredUsers =[];
    
    var IsEmailExist=false;
    
    var person = req.body;
    console.log("Sign Up", person);
     
    if(person.pass!=person.confpass){
        
        res.send({
            error:"Passes aren't equal"
        });
    }
    
    storage.getItem('RegistredUsers', function (err, value) {
    
        if(value===undefined){
            console.log("create new database");
            createUserDataBase(person);
             res.send({
                error:null,
                success: true
        
                });
        }else{
            
            RegistredUsers=value;
            console.log("database is exist");
            RegistredUsers.forEach(function(item, index){
                
                if(RegistredUsers[index].email==person.email){
                    IsEmailExist=true;
                    
                } 
            });
            
             if(IsEmailExist){
                res.send({
                error:"This email exist"
                }); 
                 
                 console.log("email exist already");
                 
            }else{
                RegistredUsers.push(person);
                storage.setItem('RegistredUsers',RegistredUsers);
                console.log("added new person");
                
                
                 res.send({
                    error:null,
                    success: true
        
                });
            }  
        }  
    });
            

  
    
};
        
  function createUserDataBase(person){
                
        var users=[];
        users.push(person);
        storage.setItem('RegistredUsers',users);
        console.log("created new database");
 }
        


exports.signIn = function(req, res) {
    
    var person = req.body;
    console.log("Sign In", person);
    
    storage.getItem('RegistredUsers', function (err, value) {
        
        var isExist=false;
        var RegistredUsers=[];
        
        
        if(value===undefined){
            console.log("no such peerson");
             res.send({
                error:"no such person"
                });
        }else{
            
           RegistredUsers=value; 
            var personFromData=null;
            
             RegistredUsers.forEach(function(item, index){
                
                if(RegistredUsers[index].email==person.email){
                    isExist=true;
                    personFromData=RegistredUsers[index];
                   
                } 
            });
            
            if(isExist){
                
            if(personFromData.pass==person.pass){
                console.log("logged in");
                res.send({
                        error:null,
                        success: true
                    });
            }else{
                console.log("no matching pass");
                res.send({
                    error:"Pass aren't match"
                });
                
            }
            }else{
                    console.log("no such person");
                    res.send({
                    error:"no such person"
                });
        }
            
        }
        
        
        
        
    });
    
};