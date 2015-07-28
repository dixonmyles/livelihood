var express = require('express');
var app = express();
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

module.exports = app;
