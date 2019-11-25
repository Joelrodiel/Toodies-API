// server.jS
require('dotenv').config();

const express      = require('express');
const MongoClient  = require('mongodb').MongoClient;
const bodyParser   = require('body-parser');
const app          = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(process.env.dbURL, { useNewUrlParser: true }, (err, client) => {
	if (err) return console.log(err);

	var database = client.db('toodies');

	const dbModule = require('./middleware/db.js');

	dbModule.initDb(database);

    var corsMiddleware = function(rep, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
        next();
    }

    app.use(corsMiddleware);

	require('./app/routes/routes')(app);

	app.get('/', (req, res) => {
		console.log("Test request made!")
		res.json({"message": "Welcome to the Toodies API", "returnCode": 200});
	});

    var port = process.env.PORT || 3000;

	app.listen(port, () => {
		console.log('We are live on ' + port);
	});
});
