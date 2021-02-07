var express = require('express');
var router = express.Router();
var Resource = require('../controllers/resource');


router.get('/download/:id',(req,res)=>{
  Resource.download(req.params.id)
    .then(dados => res.status(201).jsonp(dados))
    .catch(e => res.status(500).jsonp({error:e}))

    
})

router.get('/:id',(req,res)=>{
  Resource.lookupauthor(req.params.id)
      .then(dados => res.status(201).jsonp(dados))
      .catch(e => res.status(500).jsonp({error:e}))
});

router.get('/',(req,res)=>{
  if(req.query.id){
    Resource.lookup(req.query.id)
      .then(dados => res.status(201).jsonp(dados))
      .catch(e => res.status(500).jsonp({error:e}))
  }

  else {
  Resource.list()
        .then(dados => res.status(201).jsonp(dados))
        .catch(e => res.status(500).jsonp({error:e}))
  }
  
  });



/*-----------------------------  POST   ---------------------------------- */

router.post('/',(req,res)=>{
    Resource.insert(req.body)
        .then(dados => res.status(201).jsonp(dados))
        .catch(e => res.status(500).json({error:e}))
})

router.post('/like',(req,res)=>{
  Resource.like(req.body)
      .then(dados => res.status(201).jsonp(dados))
      .catch(e => res.status(500).json({error:e}))
})



/*-----------------------------  PUT   ---------------------------------- */

router.put('/',(req,res)=>{
  Resource.edit(req.body)
      .then(dados => res.status(201).jsonp(dados))
      .catch(e => res.status(500).json({error:e}))
})

router.put('/comment',(req,res)=>{
  Resource.insertcomment(req.body)
      .then(dados => res.status(201).jsonp(dados))
      .catch(e => res.status(500).json({error:e}))
})


/*-----------------------------  DELETE  ---------------------------------- */
router.delete('/comment', function(req, res){

  Resource.deletecomment(req.query.resource,req.query.comment)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).json({error:e}))
  });
  
  
router.delete('/:id',(req,res)=>{
  Resource.delete(req.params.id)
  .then(dados => res.status(200).jsonp(dados))
  .catch(e => res.status(500).json({error:e}))
})





module.exports = router;