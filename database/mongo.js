

// ### dependencies
var express = require('express');

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

// ## config
var config = {};

var log = {
	debug: function(...msg){
		return console.log(...msg);
	}
};

var client = null;
var db = null;

// ## func
var init = async function(opts){
	
	var params = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};
	log.debug('mongo.init - start - opts = %j', opts);
	
	try{ 
		client = await MongoClient.connect(opts.url, params);
		log.debug('mongo.init - client connected...');
	}
	catch(err){
		log.debug('mongo.init - connection catch - err = %j', err);
		throw err;
	}
	
	// url had Database name within - client.db(dbName)
	db = client.db();
	
	var colArray = await db.listCollections().toArray();
	var colList = colArray.map( x => x.name );
	log.debug('mongo.init - collections - list - %j', colList );
	
};

// ## flow
init({url: 'mongodb://192.168.1.2:27017/'});



