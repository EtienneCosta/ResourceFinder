var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var mydate = require('../modules/date');

// Devolve a lista de Users 
module.exports.list = ()=>{
    return User 
        .find()
        .sort('username')
        .exec()
}

// Permite encontrar 
module.exports.lookup = username=>{
    return User
        .findOne({username: username})
        .exec()
}

// Permite inserir um utilizador
module.exports.insert = user =>{
    user.level="consumer";
    user.reports=[];
    user.register=mydate.myDateTime(new Date().toISOString().substr(0, 16));
/*---------- <Encriptação da password do utilizador> ------------------*/
    var hashPassword= bcrypt.hashSync(user.password,10,(err,hash)=>{
            return hash;
    }) 
/*---------- </Encriptação da password do utilizador> ------------------*/
          user.password= hashPassword;
          var newUser = new User (user);
          return newUser.save()
  
}

// Permite apagar um utilizador
module.exports.delete = iden =>{
    return User.deleteOne({_id:iden});
}

// Permite editar dados de um Utilizador
module.exports.edit = user =>{
    return User.findByIdAndUpdate({_id:user._id},user,{new:true});
}