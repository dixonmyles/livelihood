var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Badge = mongoose.model('Badge');
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

router.post('/', function(req, res, next) {
  var badge = new Badge(req.body);
  badge.creator = req.payload.username;

  badge.save(function(err, badge){
    if(err){return next(err);};
    res.json(badge);
  });
});

module.exports = router;
