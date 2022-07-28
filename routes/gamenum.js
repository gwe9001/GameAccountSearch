var express = require('express');
var router = express.Router();
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
/* GET users listing. */
router.get('/', function(req, res, next) {
  var num=0;
    MongoClient.connect(config.url, function(err, db) {

    db.collection('mirrorNum').find({id:0}).toArray(function(err, docs) {
    	assert.equal(null, err);
      console.log(docs[0].num);//
      num = docs[0].num
      num+=1
      console.log(num);
      db.collection('mirrorNum').updateOne({id:0},{$set:{num:num}},function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("更新num值到"+num);
    //callback(result);
    db.close();
  });
      

      res.render('gamenum', { num: num });
      res.end();
    });
  });

  

});



router.get('/sokulibe', function(req, res, next) {
  var num=0;
    MongoClient.connect(config.url, function(err, db) {

    db.collection('sokulibeNum').find({id:0}).toArray(function(err, docs) {
    	assert.equal(null, err);
      console.log(docs[0].num);//
      num = docs[0].num
      num+=1
      console.log(num);
      db.collection('sokulibeNum').updateOne({id:0},{$set:{num:num}},function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("更新num值到"+num);
    //callback(result);
    db.close();
  });
      

      res.render('gamenum', { num: num });
      res.end();
    });
  });

  

});


module.exports = router;
