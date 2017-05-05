var mongo=require('mongodb');
var host='localhost';
var port=27017;
var server=new mongo.Server(host,port,{auto_reconnect:true});
var db=new mongo.Db('node-mongo-examples',server,{safe:true});

function dbInsert(collection,obj,callback){
	db.open(function(err,db){
		if(err){
			console.log(err);
		}else{
			db.collection(collection,function(err,col){
				col.insert(obj,function(err,doc){
					db.close();
					callback&&callback(doc);
				})
			})
		}
	});
	
}

function dbFind(collection,obj,callback){
	db.open(function(err,db){
		if(err){
			throw err;
		}else{
			db.collection(collection,function(err,col){
				col.find(obj).toArray(function(err,data){
					db.close();
					callback&&callback(data);

				})
			})
		}
	})
}

function dbUpdate(collection,selecter,document,callback){
	db.open(function(err,db){
		if(err){
			throw err;
		}else{
			db.collection(collection,function(err,col){
				col.update(selecter,document,function(err,result){
					db.close();
					callback&&callback(result);
					
				})
			})
		}
	})
}

function dbRemove(collection,selecter,callback){
	db.open(function(err,db){
		if(err){
			throw err;
		}else{
			db.collection(collection,function(err,col){
				col.remove(selecter,function(err,result){
					db.close();
					callback&&callback();
				})
			})
		}
	})
}

db.on('close',function(err,db){
	if(err)throw err;
	else {
		console.log('成功关闭数据库');
	}
}); 
var ctrl={
	find:dbFind,
	insert:dbInsert,
	update:dbUpdate,
	remove:dbRemove
}
module.exports=function(callback){
	callback&&callback(ctrl)
}