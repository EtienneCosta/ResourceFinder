var express = require('express');
var router = express.Router();
var axios = require('axios');

/*------------------------  GET  ----------------------------*/

router.get('/login', function(req, res, next) {
  res.render('login');
});

 
router.get('/logout',(req,res)=>{
  axios.get('http://localhost:8000/users/logout')
      .then(dados =>{res.redirect('http://localhost:8002/')})
      .catch(e => res.render('error',{error:"ERRO AQUI"}))
});



router.get('/register', function(req, res, next) {
  res.render('registerUser');
});

router.get('/register/resource', function(req, res, next) {
  res.render('registerResource');
});


router.get('/resources',(req,res,next)=>{
  res.render('resources');
})


/*-------------------------------------------------------------*/


/*------------------------  POST   ----------------------------*/

router.post('/login', function(req, res) {
  console.log(req.body);
  axios.post('http://localhost:8000/users/login', req.body)
    .then(dados => {
      res.cookie('token', dados.data.token, {
        expires: new Date(Date.now() + '1d'),
        secure: false, // set to true if your using https
        httpOnly: true 
      });
      //res.render('dashboard',{user:dados.data.user})
      var userid=dados.data.user._id;
      res.redirect('http://localhost:8002/dashboard/'+userid);
     // res.redirect('http://localhost:8002/dashboard/'+userid+'?token='+dados.data.token);

    })
    .catch(e => res.render('error', {error: e}))
});


router.post('/register', (req,res,next)=>{
  axios.post('http://localhost:8000/users/register',req.body)
    .then(dados => res.render('login'))
    .catch(e => res.render('error',{error:e}))
    });



/*-------------------------------------------------------------*/
module.exports = router;