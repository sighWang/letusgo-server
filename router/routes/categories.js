var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();
client.hmset('category', '1', "drink", '2', "fruit", '3', "sport");
router.get('/', function (req, res) {
  client.hgetall('category', function (err, obj) {
    var categories = [];
    _.forEach(obj, function (name, index) {
      categories.push({id: index, name: name});
    });
    res.send(categories);
  });
});

router.delete('/:id', function (req, res) {
  client.hdel('category', req.param('id'));
});

router.put('/', function (req, res) {
  var category = req.param('data');
  client.hset('category', category.id, category.name);
});

router.post('/', function (req, res) {
  var category = req.param('data');
  client.hsetnx('category', category.id, category.name);
});

module.exports = router;
