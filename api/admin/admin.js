const express = require('express');
const connection = require('../../config/environements/developement/database');
const Router = express.Router();

Router.get('/', (req, res) => {
	const sql = 'SELECT * FROM admin';
	connection.query(sql, (err, result) => {
		if (err) throw err;
		return res.status(200).send(result);
	});
});

module.exports = Router;
