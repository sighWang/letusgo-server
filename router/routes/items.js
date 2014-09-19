var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();
router.get('/', function(req, res) {
  client.get('items', function (err, obj) {
    res.send(JSON.parse(obj));
  });
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
