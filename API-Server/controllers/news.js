var mongoose = require('mongoose');
var News = require('../models/news');
var mydate = require('../modules/date');
// Devolve a lista de notícias
module.exports.list = ()=>{
    return News 
        .find()
        .sort('-date')
        .exec()
}

// Permite encontrar uma notícia pela data
module.exports.lookup = date=>{
    return News
        .findOne({date: date})
        .exec()
}

// Permite encontrar a lista de notícias de um utilizador
module.exports.lookupuser = author=>{
    return News
        .find({author:author})
        .exec()
}

// Permite inserir uma notícia
module.exports.insert = news =>{
    news.date=mydate.myDateTime(new Date().toISOString().substr(0, 16));
    var newNews = new News (news);
    return newNews.save()
}

// Permite apagar uma notícia
module.exports.delete = iden =>{
    return News.deleteOne({_id:iden});
}

// Permite editar dados de uma notícia
module.exports.edit = news =>{
    return News.findByIdAndUpdate({_id:news._id},news,{new:true});
}