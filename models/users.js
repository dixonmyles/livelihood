var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  firstName: String,
  lastName: String,
  email: String,
  site: String,
  earnedBadges: [String],
  badgePts: {type: Number, default: 0},
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var expire = new Date(today);
  expire.setDate(today.getDate() + 14);

  return jwt.sign(
    {
    _id: this._id,
    username: this.username,
    expire: parseInt(expire.getTime() / 1000),
    },
    process.env.JWTSECRET || 'SECRET'
  );
};

mongoose.model('User', UserSchema);
