var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();
router.get('/', function(req, res) {
  //TODO: Need to implement.
////  res.send('helo my dear');
//  client.lrange('goodsList', 0, -1, function (err, goodsList) {
//    res.send(JSON.parse(goodsList));
//  });
  client.get('items', function (err, obj) {
    res.send(JSON.parse(obj));
  });
//  client.get('massage',function (err, goodsList) {
//    res.send(goodsList);
//  });
//  client.lindex('goodsList',0, function (err, item) {
//    res.send(item);
//  });
  router.post('/add', function (req, res) {
    res.send(req.param('id'));
    client.get('customItems', function (err, data){
      var customItems = JSON.parse(data);

    })
  });

});

router.get('/api/items', function (req, res) {
  var items = client.get('goodsList');
  console.log(items);
  res.send(items);
});

module.exports = router;
