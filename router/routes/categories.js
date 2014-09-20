var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();
client.HMSET('categories', '1','drink', '2','fruit', '3','sport');

router.get('/', function (req, res) {
  client.hgetall('categories', function (err, obj) {
    res.send(JSON.parse(obj));
  });
});

router.post('/', function (req, res) {
  res.send(req.param('id'));
});

router.delete('/', function (req, res) {
  client.hdel('categories', req.param('id'));
  res.send(req.param('id'));
});

module.exports = router;
