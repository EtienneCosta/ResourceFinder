const mongoose = require('mongoose');

// News Schema
const newsSchema = mongoose.Schema({
  date:{type: String,required: true},
  author:{type: String,required: true},
  news:{type: String,required: true},
  description:{type: String,required: true},
  resource:{type:String,required:true}
});

module.exports = mongoose.model('news', newsSchema);