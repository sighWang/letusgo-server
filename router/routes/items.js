var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();
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
