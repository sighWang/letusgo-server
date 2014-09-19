var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();

router.get('/manage', function(req, res) {
  client.get('categories', function (err, obj) {
    res.send(JSON.parse(obj));
  });
});

router.post('/delete', function (req, res){
  res.send('enter delete'+req.param('data'));
  console.log(req.param('id'));
});

module.exports = router;
