var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();


function countLength(obj){
  var j = 0;
  _.forEach(obj, function (number, index) {
    j++;
  });
  return j;
}
router.get('/', function (req, res) {
  var i = 0, customItems = [];
  var total = 0;
  client.hgetall('customItemsWang', function (err, obj) {
    var length = countLength(obj);

    _.forEach(obj, function (number, index) {
      client.hget('itemList', index, function (err, data){
        console.log(data);
        var item = JSON.parse(data);
        var subtotal = item.price * number;
        customItems.push({goods: item, number: number ,subtotal:subtotal});
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
  if(client.hexists('customItemsWang', id)){
    client.hincrby('customItemsWang', id, increment);
  }
  else{
    client.hincrby('customItemsWang', id, increment);
  }
});


module.exports = router;
