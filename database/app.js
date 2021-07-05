
// ## dependencies
var Datastore = require('nedb');

// ## config
var neOpts = {
	filename: './test.db',
	timestampData: true,
	autoload: true
};

var db = new Datastore(neOpts);

// ## func

// ## flow

db.insert({test: 123});


