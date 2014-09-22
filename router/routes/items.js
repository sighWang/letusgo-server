var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();
var cocacola = {name: '可口可乐', unit: '瓶', price: 3.00, category: 'drink'};
var sprite = {name: '雪碧', unit: '瓶', price: 3.00, category: 'drink'};
var lychee = {name: '荔枝', unit: '斤', price: 15.00, category: 'fruit'};
var badminton = {name: '羽毛球', unit: '个', price: 4.50, category: 'sport'};
client.hmset('itemList', 'ITEM000000', JSON.stringify(cocacola),
  'ITEM000001', JSON.stringify(sprite),
  'ITEM000002', JSON.stringify(lychee),
  'ITEM000003', JSON.stringify(badminton));

client.set('customItems', JSON.stringify([]));

router.get('/', function (req, res) {
  client.hgetall('itemList', function (err, obj) {
    var items = [];
    _.forEach(obj, function (data, index) {
      var item = JSON.parse(data);
      items.push({id:index, name:item.name, unit:item.unit, price:item.price, category:item.category });
    });
    res.send(items);
  });
});

router.delete('/:id', function (req, res) {
  client.hdel('itemList', req.param('id'));
});

router.post('/add', function (req, res) {
  res.send(req.param('id'));
  client.get('customItems', function (err, data) {
    var customItems = JSON.parse(data);
    client.set('customItems', customItems);
  })
});

router.get('/customItems', function (req, res) {
  client.get('customItems', function (err, obj) {
    res.send(JSON.parse(obj));
  });
});

router.post('/customItems/edit', function (req, res) {
  var customItems = req.param('customItems');
  client.set('customItems', customItems);
});

module.exports = router;
