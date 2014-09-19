var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();

router.get('/', function(req, res) {
  //TODO: Need to implement.
  client.get('categories', function (err, obj) {
    res.send(JSON.parse(obj));
  });
});

module.exports = router;
