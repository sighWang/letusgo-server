var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();


function countLength(obj){
  var j = 1;
  _.forEach(obj, function (number, index) {
    j++;
  });
  return j;
}

router.get('/', function (req, res) {
  var i = 1, customItems = [];
  var total = 0;
  client.hgetall('customItemsWang', function (err, obj) {
    var length = countLength(obj);
    _.forEach(obj, function (number, index) {
      client.hget('itemList', index, function (err, data){
        var item = JSON.parse(data);
        var subtotal = item.price * number;
        var goods = {id: index, name: item.name, unit: item.unit, price: item.price, category: item.category };
        customItems.push({goods: goods, number: number ,subtotal:subtotal});

        total += item.price * number;
        i++;
        if(i === length){
          var categories = _.groupBy(customItems, function (custom){
            return custom.goods.category;
          });
          res.send({categories: categories, total: total});
        }

      })
    })
  });
  });


router.post('/:customItem', function (req, res) {
  var id = req.param('customItem');
  var increment = req.param('data');
  client.hincrby('customItemsWang', id, increment);
});


module.exports = router;
