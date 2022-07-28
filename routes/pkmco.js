var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('../config');/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pkmco', { title: config.pkmco.title });
});


router.post('/', function(req, res) {
  var sew=[];
	var ex=0;
	var r = 0;
  var isLimitEX = "false";
  var isLimitR="false";
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
    }
    if(req.body.isLimitR==="true"){
    	r=parseInt(req.body.r);
      isLimitR="true";
      //console.log("R:"+r);
      //console.log("R:"+isLimitR+req.body.isLimitR);
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
      //console.log(req.body.selector);
    	//var whstr = new Object();
    	//whstr.deck[$all'] = ;
      //whstr.deck = {"$in":[1,87]}
    	//console.log(whstr);
		//var url = 'mongodb://pkmco:kyvuhScrCpZ3@128.199.137.85:27017/pkmco';
		MongoClient.connect(config.url, function(err, db) {
		assert.equal(null, err);
  		console.log("Connected correctly to server.");

      var cursor;

  		if(isLimitEX==="true" && isLimitR==="true"){
        if(!req.body.selector == ""){
          cursor=db.collection('pkmco').find({"deck":{"$all":sew},"EX":ex,"R":r},{"_id":0});
          console.log("S = EX&R");
        }else{
          cursor=db.collection('pkmco').find({"EX": ex,"R":r},{"_id":0});
        }
  		}else if(isLimitEX==="true"){
        if(!req.body.selector == ""){
          cursor=db.collection('pkmco').find({"deck":{"$all":sew},"EX":ex},{"_id":0});
          console.log("S = EX");
        }else{
          cursor=db.collection('pkmco').find({"EX":ex},{"_id":0});
          console.log("S = EXS "+ ex);
        }

  		}else if(isLimitR==="true"){
        if(!req.body.selector == ""){
          cursor=db.collection('pkmco').find({"deck":{"$all":sew},"R":r},{"_id":0});
          console.log("S = R");
        }else{
          cursor=db.collection('pkmco').find({"R":r},{"_id":0});
        }
      }else if(req.body.selector == ""){
        cursor=db.collection('pkmco').aggregate([{ $sample:{ size: 10}},{$project:{"_id":0,"id":1,deck:1,EX:1,R:1}}]);

      }else{
        cursor=db.collection('pkmco').find({"deck":{"$all":sew}},{"_id":0});
        console.log("S = ");
      }

       	res.contentType('json');
       	cursor.limit(10).toArray(function(err, doc){
       	//assert.equal(1, doc.length);
       	//assert.deepEqual([1, 2, 3], );
        

       	for(var i =0;i<doc.length;i++){
          for(var j =0;j<15;j++){
            if(doc[i].deck[j] ==null || doc[i].deck[j] ==""){

            }else{
            temp = doc[i].deck[j]
            doc[i].deck[j]=config.name[temp] + config.rank[temp];
            
            }
          }
       }




       	//doc[1]=doc[2];
       	//doc.length=doc.length-1;

       	//次要條件篩選，EX數量過濾，R數量過濾
        //
    	res.send(JSON.stringify(doc));
    	res.end();
       	})

  	
});/*
	var findRestaurants = function(db, callback) {
   var cursor =db.collection('acc').find(
     {}
   );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.log(doc);
 		res.contentType('json');
    	res.send(JSON.stringify(doc));
    	res.end(); 
      } else {
         callback();
         console.log(sew);
      }
   });*/


   


});


module.exports = router;
