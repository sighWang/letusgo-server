var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();
var cocacola = {id: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00, category: 'drink'};
var sprite = {id: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, category: 'drink'};
var lychee = {id: 'ITEM000002', name: '荔枝', unit: '斤', price: 15.00, category: 'fruit'};
var badminton = {id: 'ITEM000003', name: '羽毛球', unit: '个', price: 4.50, category: 'sport'};
var goodsList = [];
goodsList.push(cocacola, sprite, lychee, badminton);
client.set('items', JSON.stringify(goodsList), function (err, reply) {
});
client.set('customItems', JSON.stringify([]));

router.get('/', function (req, res) {
  client.get('items', function (err, obj) {
    res.send(JSON.parse(obj));
  });
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
