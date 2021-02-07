let mongoose = require('mongoose');

// Comment Schema

var commentSchema = mongoose.Schema({
  postId:{type: String,required: true},
  comment:{type: String,required: true},
  author:{type: String,required: true},
  date: {type: String,required:true}
});

// Resource Schema
var resourceSchema = mongoose.Schema({
  type:{type: String,required: true},
  title:{type: String,required: true},
  subtitle:{type: String,required:true},
  creationdate:{type: String,required:true},
  registerdate:{type: String,required:true},
  visibility:{type: String,required:true},
  author:{type: String,required:true},
  authorId:{type:String,required:true},
  description:{type: String,required:true},
  comments:{type:[commentSchema],required:false},
  path:{type:String,required:true},
  likes:{type:[String],required:false},
  downloads:{type:Number,required:true}

});

module.exports = mongoose.model('resources',resourceSchema);
