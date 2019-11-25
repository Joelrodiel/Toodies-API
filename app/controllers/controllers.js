// controllers/controllers.js

var mongoose  = require('mongoose');
var ObjectID  = require('mongodb').ObjectID;
var moment = require('moment');

const db = require('../../middleware/db.js');

const collection = 'drawings';

var colors = {
	reset: "\x1b[0m",
	green: "\x1b[32m",
	yellow: "\x1b[33m"
}

module.exports = {

	getData: function (req, res) {

		db.getItems(collection, function(docs, err) {
			res.send(docs);

			console.log("[ " + moment().format() + " ]", colors.green, "Retrieved items from collection \'" + collection + "\'", colors.reset)
		});

	},

	findData: function (req, res) {

		const id = req.params.id;

		db.findItem(collection, id, function(item, err) {
			res.send(item);

			console.log("[ " + moment().format() + " ]", colors.green, "Retrieved item id \'" + id + "\' from collection \'" + collection + "\'", colors.reset)
		});
	},

	postData: function (req, res) {

		const data = {
            title: req.body.title,
            imgData: req.body.imgData,
            likes: 0,
        };

		db.postData(collection, data, function(result, err) {
			res.send(result.ops[0]);

			console.log("[ " + moment().format() + " ]", colors.green, "Posted item id \'" + result.ops[0]._id + "\' to collection \'" + collection + "\'", colors.reset)
		});

	},

	likePost: function (req, res) {

		const id = req.params.id;

		const data = { $inc: { likes: 1 } };

		db.putData(collection, id, data, function(result, err) {
			db.findItem(collection, id, function(result_2, err_2) {
				res.send({ 'newLikes': result_2.likes });
			});
		});
	},

	delData: function (req, res) {

		const id = req.params.id;

		db.delData(collection, id, function(result, err) {
			res.send("Item " + id + " deleted!");

			console.log("[ " + moment().format() + " ]", colors.yellow, "Deleted item id \'" + id + "\' from collection \'" + collection + "\'", colors.reset)
		});

	},
}
