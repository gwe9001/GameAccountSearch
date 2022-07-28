var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('../config');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: config.index.title });
});



module.exports = router;
