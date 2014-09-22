var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();

client.set('customItems', JSON.stringify([]));

//router.get('/', function (req, res) {
//  client.hgetall('itemList', function (err, obj) {
//    var items = [];
//    _.forEach(obj, function (data, index) {
//      var item = JSON.parse(data);
//      items.push({id:index, name:item.name, unit:item.unit, price:item.price, category:item.category });
//    });
//    res.send(items);
//  });
//});

router.put('/', function (req, res) {
  var customItem = req.param('data');
  client.get('customItems', function (err, data) {
    var customItems = JSON.parse(data);
    client.set('customItems', customItems);
  })
});

router.get('/', function (req, res) {
  client.get('customItems', function (err, obj) {
    res.send(JSON.parse(obj));
  });
});

router.post('/customItems/edit', function (req, res) {
  var customItems = req.param('customItems');
  client.set('customItems', customItems);
});

module.exports = router;
