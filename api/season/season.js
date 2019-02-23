const express = require('express');
const connection = require('../../config/environements/developement/database');
const Router = express.Router();

Router
	.route('/')
	.get((req, res) => {
		const getSeason = 'SELECT * FROM season';
		connection.query(getSeason, (err, result) => {
			if (err) throw err;
			return res.status(200).send(result);
		});
	})
	.post((req, res) => {
		const postseason = 'INSERT INTO `season`(`name`, `startDate`, `endDate`) VALUES (?, ?, ?)';
		const values = [
			req.body.name,
			req.body.startDate,
			req.body.endDate,
		];
		connection.query(postseason, values, (err, result) => {
			if (err) throw err;
			return res.status(201).send(result);
		});
	});
  
Router.route('/:idseason([0-3])')
	.get((req, res) => {
		const getSeason = 'SELECT * FROM `season` WHERE idseason = ?';
		connection.query(getSeason, req.params.idseason, (err, season) => {
			if (err) return res.sendStatus(204);
			return res.status(200).json(season[0]);
		});
	})
	.put((req, res) => {
		const updateSeason = 'UPDATE season SET ? WHERE idseason = ?';
		const formData = req.body;
		connection.query(
			updateSeason,
			[formData, req.params.idseason],
			(err) => {
				if (err) return res.sendStatus(204);
				return res.status(201).json(req.body);
			}
		);
	});

module.exports = Router;
