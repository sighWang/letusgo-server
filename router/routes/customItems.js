var express = require('express');
var router = express.Router();
var redis = require('redis');
var _ = require('lodash');
var client = redis.createClient();

router.get('/', function (req, res) {
  var i = 0, j = 0, customItems = [];
  client.hgetall('customItemssigh', function (err, obj) {

    _.forEach(obj, function (number, index) {
        j++;
      });

    _.forEach(obj, function (number, index) {
      client.hget('itemList', index, function (err, item){
        i++;
        customItems.push({goods: JSON.parse(item), number: number});

        if(i === j){
          var categories = _.groupBy(customItems, function (custom){
            return custom.goods.category;
          });
          res.send(categories);
        }

      })
    })

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
  }
});


module.exports = router;
