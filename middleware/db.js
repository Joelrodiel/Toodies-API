// middleware/db.js

const ObjectID = require('mongodb').ObjectID;

let _db;

function initDb(db) {
	if (_db) {
		console.warn("Trying to init DB again!");
		return
	}

	_db = db;
	console.log("Initilized DB!");
}

function checkInit() {
	if (!_db) {
		console.warn("DB is not initilized!");
		return false
	} else {
		return true
	}
}

function handleCallback(item, err, callback) {
	if (err) {
		console.warn(" DB error: " + err);
		callback(null, err);
	} else {
		callback(item, null);
	}
}

function getItems(collName, callback) {
	if (!checkInit()) return

	_db.collection(collName).find().toArray( function(err, docs) {
		handleCallback(docs, err, callback);
	});
}

function findItem(collName, id, callback) {
	if (!checkInit()) return

	const details = { "_id": new ObjectID(id) };

	_db.collection(collName).findOne(details, (err, item) => {
		handleCallback(item, err, callback);
	});
}

function postData(collName, data, callback) {
	if (!checkInit()) return

	_db.collection(collName).insertOne(data, (err, result) => {
		handleCallback(result, err, callback);
	});
}

function putData(collName, id, data, callback) {
	if (!checkInit()) return

	const details = { "_id": new ObjectID(id) };

	_db.collection(collName).updateOne(details, data, {new: true}, (err, result) => {
		handleCallback(result, err, callback);
	});
}

function delData(collName, id, callback) {
	if (!checkInit()) return

	const details = { "_id": new ObjectID(id) };

	_db.collection(collName).deleteOne(details, (err, result) => {
		handleCallback(result, err, callback);
	});
}

module.exports = {
	initDb,
	getItems,
	findItem,
	postData,
	putData,
	delData,
};
