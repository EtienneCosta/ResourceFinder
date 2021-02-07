// Roteador do servidor API para o problema da gestão de tarefas
var express = require('express');
var router = express.Router();
var Category = require('../controllers/category');

// Lista todas as categorias.
router.get('/', function(req, res) {
  Category.list()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar uma categoria por nome.
router.get('/:id', function(req, res) {
  Category.lookup(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Insere uma categoria.
router.post('/', function(req, res){
  Category.insert(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Altera o nome de uma categoria.
router.put('/:name', function(req, res){
  Category.edit(req.body,req.params.name)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remove uma categoria.
router.delete('/:id', function(req, res) {
  Category.delete(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;