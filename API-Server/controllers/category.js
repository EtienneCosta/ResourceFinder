var mongoose = require('mongoose');
var Category = require('../models/category');

// Devolve a lista de categorias ordenada por nome.
module.exports.list = ()=>{
    return Category 
        .find()
        .sort('name')
        .exec()
}

// Permite encontrar uma categoria por nome 
module.exports.lookup = name=>{
    return Category
        .findOne({name: name})
        .exec()
}

// Permite inserir uma categoria
module.exports.insert = category  =>{

        var newCategory = new Category (category);
        return newCategory.save()
       
}

// Permite apagar uma categoria
module.exports.delete = name =>{
    return Category.deleteOne({name:name});
}

// Permite editar o nome de uma categoria
module.exports.edit = (category,name) =>{
    
    return Category.findOneAndUpdate({name:name},
                                      {name:category.name});
    //return Category.findByIdAndUpdate({_id:category._id},category,{new:true});
}

