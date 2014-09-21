var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();
client.hmset('category', '1', "drink", '2', "fruit", '3', "sport");
router.get('/', function (req, res) {
  client.hgetall('category', function (err, obj) {
    var categories = [];
    _.forEach(obj, function (name,index){
        categories.push({id:index, name:name});
    });
    res.send(categories);
  });
});

router.post('/', function (req, res) {
  res.send(req.param('id'));
});

router.delete('/', function (req, res) {
  client.hdel('category', req.param('id'), function () {
  });
});

module.exports = router;
