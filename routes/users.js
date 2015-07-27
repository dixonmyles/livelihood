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

/* User Registration */
router.post('/register', function(req, res, next) {
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields!'});
  }

  var user = new User();

  user.username = req.body.username;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.setPassword(req.body.password);
  user.email = req.body.email;
  user.site = req.body.site;

  user.save(function(err){
    if(err) {return next(err);}

    return res.json({token: user.generateJWT()})
  });
});

/* User LogIn */
router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields!'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err) {return next(err);}

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(400).json(info);
    }
  })(req, res, next);
});

module.exports = router;
