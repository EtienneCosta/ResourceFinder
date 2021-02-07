var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
    username:{type: String,required: true},
    content:{type: String,required: true},
    date:{type: String,required: true}
  });

var userSchema = new mongoose.Schema({
    username: {type:String,required:true},
    password: {type:String,required:true},
    email:{type: String,required: true},
    register: {type:String,required:true},
    lastacess: {type:String,required:false},// Ao fazer o logout deve ser feita a sua actualização.
    level: {type:String,required:true},
    reports: {type:[reportSchema],required:true}
})

module.exports = mongoose.model('users',userSchema);