const mongoose = require('mongoose');

// User Schema
const categorySchema = mongoose.Schema({
  name:{type: String,required: true}});

module.exports = mongoose.model('categories', categorySchema);