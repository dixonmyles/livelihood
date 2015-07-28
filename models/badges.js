var mongoose = require('mongoose');

var BadgeSchema = new mongoose.Schema({
  title: String,
  value: Number,
  creator: String
});

mongoose.model('Badge', BadgeSchema);
