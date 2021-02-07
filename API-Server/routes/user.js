var express = require('express');
var router = express.Router();
var User = require('../controllers/user');

router.get('/',(req,res)=>{
        User.list()
            .then(dados => res.status(201).jsonp(dados))
            .catch(e => res.status(500).jsonp({error:e}))
  });



router.get('/:id',(req,res)=>{
        User.lookup(req.params.id)
            .then(dados => res.status(201).jsonp(dados))
            .catch(e => res.status(500).jsonp({error:e}))
});



// Insere um relatório.
router.post('/report', function(req, res){
    User.report(req.body)
      .then(dados => res.status(201).jsonp({dados: dados}))
      .catch(e => res.status(500).jsonp({error: e}))
  })

module.exports = router;