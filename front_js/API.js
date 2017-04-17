

  
   initialise();

var API_URL = "https://make-me-be-3d-master.appspot.com/";


function backendGet(url, callback) {
    $.ajax({
        url: '/get-model-list/',
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
        url: API_URL+url,
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



function getModelList(callback) {
    backendGet("/get-model-list/", callback);
};



function initialise(){
   
    getModelList(callback);

function callback(err, data) {

    if (err) {
        console.log(err);
    }
    else {
        var models =[];
        models = data;
        console.log(models);
        showModels(models);
    }
}
    
    
}


function showModels(models){
    
   var model_li = $("#models_field");
   $(".TEMP").hide();
    
    var item =$(".TEMP").html();
    //console.log(item);
    for(var i=0;i<models.length;i++){
            console.log(models[i]);
        
           showModel(models[i],item); 
        }
    
     function showModel(model,item) {
        var node = $(item);
        
        if(model.name){
            //console.log(model);
            //console.log(node);
            
            node.find(".model-name").text(model.name);
            node.find(".model-descr").text(model.description);

            model_li.append(node);
            console.log("appended");   
        }
    }
    
}



