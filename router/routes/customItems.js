var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();


function countLength(obj) {
  var j = 1;
  _.forEach(obj, function () {
    j++;
  });
  return j;
}

router.get('/', function (req, res) {
  client.hgetall('customItemsWang', function (err, obj) {
    var i = 1;
    var total = 0;
    var customItems = [];
    var length = countLength(obj);
    _.forEach(obj, function (number, index) {
      client.hget('itemList', index, function (err, data) {
        var item = JSON.parse(data);
        var subtotal = item.price * number;
        var goods = {id: index, name: item.name, unit: item.unit, price: item.price, category: item.category };
        customItems.push({goods: goods, number: number, subtotal: subtotal});
        total += item.price * number;
        i++;
        if (i === length) {
          res.send({categories: customItems, total: total});
        }
      })
    })
  });
});


router.post('/:customItem', function (req, res) {
  var id = req.param('customItem');
  var increment = req.param('data');
  client.hincrby('customItemsWang', id, increment);
  res.send({id: id, increment: increment});
});


module.exports = router;
