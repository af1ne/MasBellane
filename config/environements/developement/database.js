/* global process */

const mysql = require('mysql2');
const shell = require('shelljs');

const connection = mysql.createConnection({

	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,

});

connection.connect((err) => {
	if (err) throw err;
	shell.echo('✔️ Database conneted with success');
});

module.exports = connection;
