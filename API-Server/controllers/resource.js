var mongoose = require('mongoose');
var Resource = require('../models/resource');
var mydate = require('../modules/date');


// Devolve a lista de recursos 
module.exports.list = ()=>{
    return Resource 
        .find()
        .sort('type')
        .exec()
}

// Permite encontrar um recurso pelo id.
module.exports.lookup = iden=>{
    return Resource
        .findOne({_id: iden})
        .exec()
}

// Permite encontrar a lista de recursos de um User.
module.exports.lookupauthor = iden =>{
    return Resource
        .find({authorId:iden})
        .exec()
}

// Permite encontrar a lista de recursos por tipo
module.exports.lookuptype = type =>{
    return Resource
        .find({type:type})
        .exec()
}

// Permite encontrar uma lista de recursos através de uma keyword do title.
module.exports.lookuptitle = keyword=>{
    return Resource
        .find({title:{$regex:/keyword/i}})
        .exec()
}

// Permite encontrar a lista de recursos públicos 
module.exports.lookupvisibility = ()=>{
    return Resource
        .find({visibility:"public"})
        .exec()
}

// Permite encontrar a lista de recursos públicos com x ou mais likes
module.exports.lookuplikes = likes =>{
    return Resource 
        .find({visibility:"public",likes:{$gte: likes}})
        .exec()
}


// Permite encontrar a lista de recursos públicos com x ou mais downloads
module.exports.lookupdownloads = downloads =>{
    return Resource 
        .find({visibility:"public",downloads:{$gte: downloads}})
        .exec()
}

// Permite inserir um utilizador
module.exports.insert = resource =>{
    resource.registerdate =  mydate.myDateTime(new Date().toISOString().substr(0, 16));
    resource.downloads = 0 ;
    resource.coments = [];
    resource.likes = [];
    var newResource = new Resource (resource);
    return newResource.save()
}

// Permite apagar um recurso
module.exports.delete = iden =>{
    return Resource.deleteOne({_id:iden});
}

// Permite editar dados de um recurso
module.exports.edit = resource =>{
    return Resource.findByIdAndUpdate({_id:resource._id},resource,{new:true});
}

// Permite adicionar um novo comentario
module.exports.insertcomment = (resource) => {
    resource.date=mydate.myDateTime(new Date().toISOString().substr(0, 16));

    return Resource.findByIdAndUpdate({_id: resource.postId}, {$push: {comments: resource}}).exec()
}

//Permite editar um comentário
// Permite editar dados de um recurso
/*
module.exports.editcomment = resource =>{
    return Resource.updateOne({_id:resource._id, comments._id:resource.commentID},{$set:{comments.comment:resource.comment}})
};
*/

 
// Permite remover um novo comentario
module.exports.deletecomment = (resource, comment) => {
    return Resource.findByIdAndUpdate({_id: resource}, {$pull: {comments: {_id: comment}}}).exec()
}

// Permite dar um like sobre um recurso
module.exports.like = (resource) => {
    if(resource.likes == 1){
                return Resource.findByIdAndUpdate({_id: resource._id}, {$push: {likes: resource.userid}}).exec()
    }
    else{
        return Resource.findByIdAndUpdate({_id: resource._id}, {$pull: {likes: resource.userid}}).exec()
    }
}


// Download feito 
module.exports.download = (iden) => {
        return Resource.findByIdAndUpdate({_id: iden}, {$inc: {downloads: 1}}).exec()
   
}