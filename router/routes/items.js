var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();
router.get('/', function(req, res) {
  //TODO: Need to implement.
  res.send('success');
//  var items = client.get('goodsList');
//  console.log(items);
//  res.send(items);
});

router.get('/api/items', function (req, res) {
  var items = client.get('goodsList');
  console.log(items);
  res.send(items);
});

module.exports = router;
