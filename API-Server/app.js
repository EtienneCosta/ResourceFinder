var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var cors = require('cors');

var usersRouter = require('./routes/user');
var categoriesRouter = require('./routes/category');
var newsRouter = require('./routes/news');
var resourcesRouter = require('./routes/resource');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/ResourceFinder', 
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function() {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});



var app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
/*
Com este código aqui estou literalmente a restringir todas as rotas
por estar no pipeline vertical

app.use((req,res,next)=>{
  fs.readFile(__dirname+'/keys/pubkey.pem',(e,publicKey)=>{
  console.log("Token:"+req.query.token);
  jwt.verify(req.query.token,publicKey,{algorithms: ['RS256']},(err,payload)=>{
  if(err)
    res.status(401).json({error:'Erro na verificacao do token: '+ err});
   else {
     console.log('DATA:'+JSON.stringify(payload));
     req.user = {username: payload.username, level:payload.level}
     next();
     }
  })
 })
}) 
*/


app.use('/categories',categoriesRouter);
app.use('/news', newsRouter);
app.use('/users',usersRouter);
app.use('/resources', resourcesRouter);
 
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).jsonp({error: err.message})
});

module.exports = app;
