
// ## dependencies
var fs = require('fs');
var Datastore = require('nedb');

// ## config
var folder = './data/';

var neOpts = {
	filename: folder + 'test.db',
	timestampData: true,
	autoload: true
};

var testdb = new Datastore(neOpts);

// ## func
var listTables = function(){
	return fs.readdirSync(folder);
};

// ## flow

var tables = listTables();
console.log( tables.map(x => x.replace('.db', '')) );

testdb.insert({test: 123});

testdb.find({ test: 123 }, function (err, docs) {
	console.log( docs );
});



