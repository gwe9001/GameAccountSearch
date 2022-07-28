var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('../config');/* GET home page. */



router.get('/', function(req, res, next) {
  res.render('mirror', { title: config.mirror.title });
});


router.post('/', function(req, res) {
    //console.log(req.body.selector);
    //console.log(req.body.ex);
    //console.log(req.body.r);
    //console.log(req.body.isLimitEX);
    //console.log(req.body.isLimitR);
    //console.log();
  var sew=[];
  var ssr=0;
  var sr = 0;
  var isLimitEX = "false";
  var isLimitR="false";
  var query ={};
    //console.log(req.body.selector);
    //console.log(req.body.ex);
    //console.log(req.body.r);
    //console.log(req.body.isLimitEX);
    //console.log(req.body.isLimitR);
    //console.log();
    if(req.body.isLimitEX==="true"){
      ex=parseInt(req.body.ex);
      isLimitEX="true";
      //console.log("EX:"+ex);
      //console.log("EX:"+isLimitEX);
      query['SSR']=ex;
    }
    if(req.body.isLimitR==="true"){
      r=parseInt(req.body.r);
      isLimitR="true";
      //console.log("R:"+r);
      //console.log("R:"+isLimitR+req.body.isLimitR);
      query['SR']=r;
    }
      sew = req.body.selector.split(",")
      //console.log(sew);
      sew.length = sew.length-1;
     // console.log(sew);
      for (var i = 0; i <sew.length; i++) {
        if(sew[i] == "" || sew[i] ==null||sew[i] ==undefined){
          
        }else{
          sew[i] =parseInt(sew[i]) ;
        }
        
      }
		MongoClient.connect(config.url, function(err, db) {
		assert.equal(null, err);
  		console.log("Connected correctly to server.");
      var char=["",];
      
        db.collection('mirrorCharData').find({},{"_id":0}).toArray(function(err, doc){
          //console.log(doc[0])
          for(var i=0;i<doc.length;i++){
            tempa=doc[i].id
            char[tempa] = doc[i];
          }
          
        });
      
     
      if(req.body.selector==""){

      }else{
        query['deck']={"$all":sew};
      }
      if(req.body.co ==""){

      }else{
        query['co']=parseInt(req.body.co);
      }



        var cursor=db.collection('mirror').find(query,{"_id":0});

        
        
       	res.contentType('json');
       	cursor.limit(50).toArray(function(err, doc){
          //console.log(char);
          temp = doc.deck;
          doc.deck={};
          //for(var i=0;i<temp.length;i++){
          //  doc.deck+=char[temp];
          //}
        for(var i =0;i<doc.length;i++){
          for(var j =0;j<15;j++){
            if(doc[i].deck[j] ==null || doc[i].deck[j] ==""){

            }else{
            temp = doc[i].deck[j]
            doc[i].deck[j]=char[temp];
            //console.log(doc[i].deck[j]);
            }
          }
       }
       


       	//doc[1]=doc[2];
       	//doc.length=doc.length-1;

       	//次要條件篩選，EX數量過濾，R數量過濾
        //
    	res.send(JSON.stringify(doc));
    	res.end();
      db.close();
       	});

  	
});


   


});


module.exports = router;
