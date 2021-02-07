var fs = require('fs');


/* Refactor this code to make more eficient and return an message of sucess or error */

exports.checkfiles = (path)=>{
    var manifest = path+"/manifest.txt";
    var success ="Manifest okay";
    var errors ="";

    // Check if exist the unziped file
   if(fs.existsSync(path)){
       console.log('Directory '+path+' exists!');
    }
   else{
    console.log('Directory' +path+' not found');
    errors=errors.concat("Directory not found :: "+path+"\n");
    }

    
   if(fs.existsSync(manifest)){
    console.log('Manifest file exists: '+manifest);

    // All paths  on data 
    var paths = fs.readFileSync(manifest).toString().split("\n");
    
    for(var i=0;i<paths.length;i++){
        if(fs.existsSync((path+"/"+paths[i]))){
            console.log(path+"/"+paths[i]+" okayyy");
        }

        else{
            console.log(path+"/"+paths[i]+" not okayyy");
            errors=errors.concat(path+"/"+paths[i]+" not found :: check your manifest \n");
        }
    }

   }

   else{
    console.log('Manifest file not found: '+manifest);
    errors= errors.concat("Manifest file not found :: "+manifest+"\n");
   }

   if(errors.length==0)
    return success;
   else
    return errors; 

}