var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var redis = require('redis');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// development settings
if (app.get('env') === 'development') {

  // This will change in production since we'll be using the dist folder
  app.use(express.static(path.join(__dirname, '../client')));
  // This covers serving up the index page
  app.use(express.static(path.join(__dirname, '../client/.tmp')));
  app.use(express.static(path.join(__dirname, '../client/app')));

  // development error handler
  // will print stacktrace
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production settings
if (app.get('env') === 'production') {

  // changes it to use the optimized version for production
  app.use(express.static(path.join(__dirname, '/dist')));

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}
var client = redis.createClient();
var cocacola = {id: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00, category: 'drink'};
var sprite = {id: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, category: 'drink'};
var lychee = {id: 'ITEM000002', name: '荔枝', unit: '斤', price: 15.00, category: 'fruit'};
var badminton = {id: 'ITEM000003', name: '羽毛球', unit: '个', price: 4.50, category: 'sport'};
var goodsList = [];
goodsList.push(cocacola, sprite, lychee, badminton);
var categories = [
  {id: 1, name: 'drink'},
  {id: 2, name: 'fruit'},
  {id: 3, name: 'sport'}
];
client.set('items', JSON.stringify(goodsList), function (err, reply) {
});
client.set('categories', JSON.stringify(categories));
client.set('customItems', JSON.stringify([]));

// routes
var router = require('./router')(app);
module.exports = app;
