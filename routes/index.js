var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var path = require('path');

/* GET home page. */
app.get('/', function(req, res, next) {
  res.sendFile(
    '/views/index.html',
    { root: path.join(__dirname, '../', 'public') },
    function(err){
      if (err){
        console.log(err);
        res.status(err.status).end();
      }
      else{
        console.log('Sent: index.html');
    }
  });
});

/* User Registration */
app.post('/register', function(req, res, next) {
  if(!req.body.username || !req.body.password){
    console.log('Improper Form Submission');
    return res.status(400).json({message: 'Please fill out all fields!'});
  }

  console.log('Creating the user...');
  var user = new User();
  console.log('ITS ALIVE');
  user.username = req.body.username;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.setPassword(req.body.password);
  user.email = req.body.email;

  console.log('About to save the user!');
  user.save(function(err){
    console.log('Trying to save the user!');
    if(err) {return next(err);}

    return res.json({token: user.generateJWT()})
  });
});

/* User LogIn */
app.post('/login', function(req, res, next){
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

module.exports = app;
