var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('Badge');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.JWTSECRET || 'SECRET', userProperty: 'payload'});

/* GET list of available badges */
router.get('/', function(req, res, next) {
  Badge.find(function(err, badges){
    if(err){
      return next(err);
    }
    res.json(badges);
  });
});

module.exports = router;
