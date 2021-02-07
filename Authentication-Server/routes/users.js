var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');

var passport = require('passport')

// User Controller
var User = require('../controllers/user');

// Login page
router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      console.log('Logout done ...');
      res.redirect('http://localhost:8002/');
    } else {
        console.log('Destroy session error: ', err)
    }
  });
});
  
router.get('/',(req,res)=>{
  User.list()
      .then(dados => res.status(201).jsonp({user:dados}))
      .catch(e => res.status(500).jsonp({error:e}))
});


router.post('/register',(req,res)=>{
  User.insert(req.body)
      .then(dados => res.status(201).jsonp({user:dados}))
      .catch(e => res.status(500).jsonp({error:e}))
});


router.post('/login', passport.authenticate('local'), function(req, res){
  fs.readFile(__dirname+'/../keys/mykey.pem',(e,privateKey)=>{

    jwt.sign({userId:req.user._id,username:req.user.username,email:req.user.email,level:req.user.level},privateKey,{algorithm:'RS256'},(err,token)=>{
      if(err){
      res.status(500).jsonp({error:"Erro na geração do Token: "+err});
    }
    else {
          res.status(201).jsonp({user:req.user,token:token});
         }
     })
  })
})
module.exports = router;