
// ## dependencies
var fs = require('fs');

// ## config
var folder = './data/';
var testTable = 'test';

// ## func
var listTables = function(){
	var arr = fs.readdirSync(folder);
	return arr.map(x => x.replace('.db', ''));
};
var listDocuments = function(tableName){
	var arr = fs.readdirSync(folder + tableName);
	return arr.map(x => x.replace('.txt', ''));
};
var insertDoc = function(tableName, doc){
	var str = JSON.stringify(doc, null, 2);
	var filePath = folder + tableName + '/' + doc._id + '.txt';
	
	return fs.writeFileSync(filePath, str);
};
var search = function(tableName, query){
	return null;
};
var index = function(tableName){
	// async
	setTimeout(function(){
		
	}, 10);
};

// ## flow

var tables = listTables();
console.log( 'tables = %j', tables );

var docs = listDocuments(testTable);
console.log( 'docs[%s] = %j', testTable, docs );

insertDoc(testTable, { _id: '123', here: 'abc' });
index();

setTimeout(function(){
	
	var result = search(testTable, {here: 'abc' });
	console.log( 'result = %j', result );
	
}, 50);



