// Roteador do servidor API para o problema da gestão de tarefas
var express = require('express');
var router = express.Router();
var News = require('../controllers/news');

// Lista todas as notícias.
router.get('/', function(req, res) {
  News.list()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar uma notícia por autor.
router.get('/', function(req, res) {
  News.lookupuser(req.query.author)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


// Consultar uma notícia pela data.
router.get('/', function(req, res) {
    News.lookup(req.query.date)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
  });

// Insere uma notícia.
router.post('/', function(req, res){
  News.insert(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Altera o nome de uma categoria.
router.put('/', function(req, res){
  News.edit(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remove uma notícia.
router.delete('/', function(req, res) {
  News.delete(req.query.nome)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;