var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastNmae: String,
  email: String,
  site: String,
  badgePts: {type: Number, default: 0}
});

mongoose.model('User', UserSchema);
