var express = require('express');
var axios = require('axios');
var path = require("path")
var jwt_decode = require('jwt-decode');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var router = express.Router();
var filehandler = require('../modules/FileHandler');
var checkmanifest = require('../modules/CheckManifest');

/*-------- <Handling Files> ----------- */
var multer = require('multer');

//  var unzipper = require('unzipper');


/*----- Allows to keep the original name ------*/
var storage = multer.diskStorage({
  destination:'./public/data/SIP/',
  filename: (req,file,cb)=>{
    cb(null,file.originalname)
  }
})


var upload = multer({ storage: storage })
var fs = require('fs');
var AdmZip = require('adm-zip');


/*-----------     </Handling Files>   -------------------- */




/*------------------------------    GET  --------------------------------------------*/

/*--------------- GET USER RESOURCE PAGE. --------------------*/
router.get('/resources/:id',(req, res, next)=> {

  axios.all([
    axios.get('http://localhost:8001/users/'+req.params.id),
    axios.get('http://localhost:8001/resources/'+req.params.id)
  ])
  .then(axios.spread((...responses) => {
    var user = responses[0].data;
    var resources = responses[1].data;
    res.render('resources',{user:user,resources:resources,token:req.cookies.token})
  }))
  .catch(e => res.render('error',{error:e}))
});

/*--------------- GET ALL RESOURCES OR GET ALL RESOURCES OF USER PAGE. --------------------*/
router.get('/resources',(req, res, next)=> {  
  
  console.log("--------SESSION-------------");
  console.log(req.cookies);
  var decoded = jwt_decode(req.cookies.token);
  var username = decoded.username;
  var userid = decoded.userId;
  console.log(decoded);
  console.log("-------------------------");

  if (req.query.delete){
      axios.delete('http://localhost:8001/resources/',{_id:req.query.delete})
      .then(dados => {
          res.redirect('http://localhost:8002/dashboard/resources/'+username)
      })
      .catch(e => res.render('error',{error:e}))    
  }

  else if (req.query.id){

    axios.get('http://localhost:8001/resources?id='+req.query.id)
      .then(dados => {
        res.render('resource',{resource:dados.data,username,userid,token:req.cookies.token})
      })
      .catch(e => res.render('error',{error:e}))    


  }

  else{
      axios.all([
      axios.get('http://localhost:8001/users/'+userid),
      axios.get('http://localhost:8001/resources/')
    ])
    .then(axios.spread((...responses) => {
      var user = responses[0].data;
      var resources = responses[1].data;
      res.render('resources',{user:user,resources:resources,token:req.cookies.token})
    }))
    .catch(e => res.render('error',{error:e}))
  }

});

/* GET REGISTER RESOURCE PAGE. */
router.get('/registerResource',(req, res, next)=> {
  console.log("--------SESSION-------------");
  console.log(req.cookies);

  console.log("TOKEN ::::: "+req.cookies.token);
  var decoded = jwt_decode(req.cookies.token);
  var username = decoded.username;
  var userid = decoded.userId;
  console.log(decoded);
  console.log("-------------------------");
  axios.get('http://localhost:8001/categories')
    .then(categories=>
      { res.render('registerResource',{userid,username,categories:categories.data,token:req.cookies.token})})
    .catch(e=>{ 
      res.render('error',{error:e})})
})


/* GET USER STATS PAGE. */
router.get('/stats',verificaAutenticacao,(req, res, next)=> {

  console.log("--------SESSION-------------");
  console.log(req.cookies);
  var decoded = jwt_decode(req.cookies.token);
  var username = decoded.username;
  var userid = decoded.userId;
  console.log(decoded);
  console.log("-------------------------");


  axios.all([
    axios.get('http://localhost:8001/users/'),
    axios.get('http://localhost:8001/resources/')
  ])
  .then(axios.spread((...responses) => {
    var users = responses[0].data;
    var resources = responses[1].data;
    var likes=0;
    var downloads=0;
    for(var i=0;i<resources.length;i++){
      likes+=resources[i].likes.length;
      downloads+=resources[i].downloads
    }
   
    res.render('stats',{users:users,resources:resources,likes,downloads,username,userid})
  }))
  .catch(e => res.render('error',{error:e}))
});


function verificaAutenticacao(req,res,next){

  console.log("ENTREI NO VERIFICA AUTENTICACAO...");
  fs.readFile(__dirname+'/../keys/pubkey.pem',(e,publicKey)=>{
    console.log("Token:"+req.query.token);
    jwt.verify(req.query.token,publicKey,{algorithms: ['RS256']},(err,payload)=>{
    var decoded = jwt_decode(req.query.token);
    var userid = decoded.userId;
    var level = decoded.level;
    console.log("LEVEL:: "+level);

    if(err)
      res.status(401).json({error:'Erro na verificacao do token: '+ err});
    
    else if(level!="admin"){
      res.render('401',{userid})
    }


     else {
       console.log('DATA:'+JSON.stringify(payload));
       req.user = {username: payload.username, level:payload.level}
       next();
       }
    })
   })
  }  

/* GET dashboard page. */
router.get('/:id',(req, res, next)=> {
  axios.all([
    axios.get('http://localhost:8001/users/'+req.params.id),
    axios.get('http://localhost:8001/resources/'),
    axios.get('http://localhost:8001/resources/'+req.params.id),
    axios.get('http://localhost:8001/news/')
  ])
  .then(axios.spread((...responses) => {
    var user = responses[0].data;
    var library = responses[1].data;
    var myresources = responses[2].data;
    var news = responses[3].data;
    res.render('dashboard',{user:user,library:library,myresources:myresources,news:news,token:req.cookies.token})
  }))
  .catch(e => res.render('error',{error:e}))
});

/*-------------------------------------------------------------------------------------*/


/*------------------------------    POST  --------------------------------------------*/

router.post('/',upload.single('zippedfile'),(req,res,next)=>{
  //req.file is the name of your file in the form above, here zippedfile
  
console.log("--------BODY-------------");
console.log(req.body);
console.log("-------------------------");

  console.log("--------FILE-------------");
  console.log(req.file);
  // The original name of loaded file without extension ...
  var originalname = req.file.originalname.split(".zip")[0];
  
  console.log("-------------------------");

  console.log("--------SESSION-------------");
  console.log(req.cookies);
  var decoded = jwt_decode(req.cookies.token);
  console.log(decoded);
  console.log("-------------------------");

  // The path of the unziped path,i.e, public/data/SIP/Dir/ ...
  var unzipedPath = req.file.path.split(".zip")[0];


  filehandler.unzip(req.file.path,req.file.destination);

  var report = checkmanifest.checkfiles(unzipedPath);

  if(report=="Manifest okay"){

 console.log("--------OLD PATH VS NEW PATH-------------");
 /* It allows us to move the converted SIP to the respective AIP/USERNAME directory */
 var oldpath = __dirname+"/../"+unzipedPath;
 var newpath = __dirname+"/../public/data/AIP/"+decoded.username+"/";



 filehandler.moveandclean(oldpath,newpath);
 console.log("-------------------------");

 console.log("--------BODY-------------");
 console.log(newpath);
 req.body.author=decoded.username;
 req.body.authorId=decoded.userId;


 req.body.path=newpath+originalname;
 console.log(req.body);
 console.log("-------------------------");



console.log("--------REPORT-------------");
    var log= {
      "username":decoded.username,
      "content": " File "+originalname +" sucessfully loaded"
    }
console.log("-------------------------");


/*-------------------- <Handling Categories> ----------------------- */
console.log("--------Category-------------");
    var category= {
      "name":req.body.type
    }
console.log("-------------------------");

  axios.get('http://localhost:8001/categories')
      .then(categories=> { 
        var flag=false;
        for(var i=0;(i<categories.data.length&&flag==false);i++){
            if((categories.data)[i].name==category.name)
              flag=true;
        }

        if(flag==false)
          axios.post('http://localhost:8001/categories',category)
          .then(dados => res.status(201).jsonp({dados: dados}))
          .catch(e => res.status(500).jsonp({error: e}))
      })
      .catch(e => res.render('error',{error:e}))

/*-------------------- </Handling Categories> ----------------------- */


  axios.all([
  axios.post('http://localhost:8001/resources', req.body),
  axios.post('http://localhost:8001/users/report',log)
])
.then(axios.spread((...responses) => {
  var resourceResponse = responses[0];
  console.log("-----------<RESPONSE>---------------------")
  console.log(resourceResponse);

  console.log(resourceResponse.data._id);

  console.log("ID DO RECURSO:: "+resourceResponse.data._id);
  console.log("-----------</RESPONSE>---------------------")


  if(req.body.visibility=="public"){
  console.log("--------NEWS-------------");
  var news= {
    "author": decoded.username,
    "news": req.body.title,
    "description": req.body.description,
    "resource": resourceResponse.data._id
  }
  console.log("-------------------------");
  axios.post('http://localhost:8001/news', news); 
}

  res.redirect('http://localhost:8002/dashboard/'+decoded.userId);
}))
.catch(e => res.render('error',{error:e}))
  }
  else{

    fs.readdir(req.file.destination, (err, files) => {
      if (err)
          throw err;
    
      for (const file of files) {
          var filepath = path.join(req.file.destination, file);
          console.log("FILEPATH ::::: "+filepath);
          if (fs.lstatSync(filepath).isDirectory()) {
              fs.rmdirSync(filepath, { recursive: true });
          }
    
          else {
              fs.unlink(filepath, err => {
                  if (err)
                      throw err;
              })
          }
    
      }
    });
    
    console.log("--------REPORT-------------");
    var log= {
      "username":decoded.username,
      "content": report
    }
    console.log("-------------------------");

    axios.all([
        axios.post('http://localhost:8001/users/report',log)
    ])
    .then(axios.spread((...responses) => {
      res.redirect('http://localhost:8002/dashboard/'+decoded.userId);
    }))
    .catch(e => res.render('error',{error:e}))
    

  }
  

})



router.get('/resources/download/:id',(req,res,next)=>{
  axios.get('http://localhost:8001/resources?id='+req.params.id)
    .then(dados => {
      var decoded = jwt_decode(req.cookies.token);
      var username = decoded.username;
      var userid = decoded.userId;
      var userDownload = __dirname +'/../public/data/Downloads/'+username+'-'+userid+'/';
      var resource = dados.data; 
      filehandler.myzip(resource.path);
      var zippedfile=resource.path+".zip";
      var filename= resource.path.split("/")[resource.path.split("/").length-1]+".zip";

      if (!fs.existsSync(userDownload)){
        fs.mkdirSync(userDownload);
      }
      userDownload=userDownload+filename;
      fs.renameSync(zippedfile,userDownload);
      res.download(userDownload,(error)=>{
        if(error)
          console.log("Problemas ao fazer o download do ficheiro..");
        else 
          axios.get('http://localhost:8001/resources/download/'+req.params.id)
            .then(dados => res.status(200))
            .catch(e => res.render('error',{error:e}))
          });
  
    })
    .catch(e => res.render('error',{error:e}))

})


/*-------------------------------------------------------------------------------------*/


/*------------------------------    PUT | DELETE | POST   --------------------------------------------*/

router.post('/resources',(req,res,next)=>{

  console.log("--------SESSION-------------");
  var decoded = jwt_decode(req.cookies.token);
  var username = decoded.username;
  console.log("-------------------------");
  
  if(req.query.delete){
    var resource = {
      _id:req.body._id
    }

    axios.delete('http://localhost:8001/resources?delete='+req.query.delete,resource)
    .then(dados => {
        res.redirect('http://localhost:8002/dashboard/resources/'+username)
    })
    .catch(e => res.render('error',{error:e}))  
  }

  else {
      axios.put('http://localhost:8001/resources/',req.body)
      .then(dados => {
          res.redirect('http://localhost:8002/dashboard/resources?id='+dados.data._id)
      })
      .catch(e => res.render('error',{error:e}))
  }  
});

router.post('/resources/like',(req,res,next)=>{

    axios.post('http://localhost:8001/resources/like',req.body)
    .then(dados => {
        res.redirect('http://localhost:8002/dashboard/Costa');

    })
    .catch(e => res.render('error',{error:e}))  
  })

  
  router.post('/resources/comment',(req,res,next)=>{
    axios.put('http://localhost:8001/resources/comment',req.body)
    .then(dados => {
        res.redirect('http://localhost:8002/dashboard/resources?id='+dados.data._id); 
    })
    .catch(e => res.render('error',{error:e}))  
  })







/*------------------------------------------------------------------------------------*/

module.exports = router;