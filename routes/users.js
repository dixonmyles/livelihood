var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.JWTSECRET || 'SECRET', userProperty: 'payload'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err){
      return next(err);
    }
    res.json(users);
  });
});

/* POST users listing */
router.post('/', function(req, res, next){
  var user = new User(req.body);

  user.save(function(err, user){
    if(err){return next(err);
    }
    res.json(user);
  });
});

module.exports = router;
