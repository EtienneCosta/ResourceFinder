var mongoose = require('mongoose');
var User = require('../models/user');
var mydate = require('../modules/date');


// Devolve a lista de Users 
module.exports.list = ()=>{
    return User 
        .find()
        .sort('username')
        .exec()
}

// Permite encontrar 
module.exports.lookup = iden=>{
    return User
        .findOne({_id: iden})
        .exec()
}

// Permite inserir um utilizador
module.exports.insert = user =>{
     user.register=mydate.myDateTime(new Date().toISOString().substr(0, 16));
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

// Permite adicionar um relatório 
module.exports.report = report =>{
    report.date=mydate.myDateTime(new Date().toISOString().substr(0, 16));
    return User.updateOne({username:report.username},
                         {$set: {level:"producer"},$push:{reports:report} }
                         )}