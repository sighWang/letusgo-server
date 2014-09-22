var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();

router.get('/', function (req, res) {
  client.hgetall('customItemssigh', function (err, obj) {
    var customItems = [];
    _.forEach(obj, function (data, index) {
      var redisItem = hget('itemList', index);
      var item = JSON.parse(redisItem);
      customItems.push({item: item, number: data});
    });
    res.send(customItems);
  });
});

router.post('/:customItem', function (req, res) {
  var id = req.param('customItem');
  var increment = req.param('data');
  if(client.hexists('customItemssigh', id)){
    client.hincrby('customItemssigh', id, increment);
  }
  else{
    client.hincrby('customItemssigh', id, increment);
    console.log('enter 2');
  }
});


module.exports = router;
