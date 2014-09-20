var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();
var categories = [
  {id: 1, name: 'drink'},
  {id: 2, name: 'fruit'},
  {id: 3, name: 'sport'}
];
client.set('categories', JSON.stringify(categories));


client.hset('test','1','sigh');
router.get('/test', function (req, res){
  console.log('enter');
  res.send(client.hget('test','1'));
});
router.get('/manage', function (req, res) {
  client.get('categories', function (err, obj) {
    res.send(JSON.parse(obj));
  });
});

router.post('/', function (req, res) {
 // client.set('categories', req.body);
  console.log(req.param('id'));
  res.send(req.param('id'));
});

router.delete('/',function (req, res) {
  res.send(req.param('id'));
});
module.exports = router;
