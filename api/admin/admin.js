const express = require('express');
const connection = require('../../config/environements/developement/database');
const Router = express.Router();

Router
	.route('/')

	.get((req, res) => {
		const sql = 'SELECT idadmin, email, firstname, lastname FROM admin';
		connection.query(sql, (err, result) => {
			if (err) throw err;
			return res.status(200).send(result);
		});
	})

	.post((req, res) => {

	})

	.put((req, res) => {

	})

	.delete((req, res) => {

	});

module.exports = Router;
