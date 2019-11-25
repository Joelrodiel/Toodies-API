// routes/index.js

const routes = require('../controllers/controllers');

module.exports = function(app) {

	app.get('/drawings', routes.getData);

	app.get('/drawings/:id', routes.findData);

	app.post('/drawings', routes.postData);

	app.get('/likeDrawing/:id', routes.likePost);

	app.delete('/drawings/:id', routes.delData);

};
