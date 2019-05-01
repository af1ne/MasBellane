const express = require('express');
const connection = require('../../config/environnements/developement/database');
const Router = express.Router();

Router
	.route('/')

.get((req, res) => {
	const getAllRooms = 'SELECT * FROM room WHERE idroom < 3';
	connection.query(getAllRooms, (err, result) => {
		if (err) throw err;
		return res.status(200).send(result);
	});
})

	.post((req, res) => {
		const postNewRoom = 'INSERT INTO `room`(`title`, `subtitle`, `content`, `area`, `galerie_idgalerie`, `booking_idbooking`, `rate_idrate`) VALUES (?, ?, ?, ?, ?, ?, ?)';
		const values = [
			req.body.title,
			req.body.subtitle,
			req.body.content,
			req.body.area,
			req.body.galerie_idgalerie,
			req.body.booking_idbooking,
			req.body.rate_idrate
		];
		connection.query(postNewRoom, values, (err, result) => {
			if (err) throw err;
			return res.status(201).send(result);
		});
	});
  
// Router
// 	.route('/:idsection(\\d{2,})')
// 	.get((req, res) => {
// 		const getSection = 'SELECT `section`.*, `galerie`.* FROM`section` LEFT JOIN`section_has_galerie` ON`section_has_galerie`.`section_idsection` = `section`.`idsection` LEFT JOIN`galerie` ON`section_has_galerie`.`galerie_idgalerie` = `galerie`.`idgalerie` WHERE section.idsection = ?';
// 		connection.query(getSection, req.params.idsection, (err, section) => {
// 			if (err) return res.sendStatus(204);
// 			return res.status(200).json(section[0]);
// 		});
// 	})
// 	.put((req, res) => {
// 		const updateSection = 'UPDATE section SET ? WHERE idsection = ?';
// 		const formData = req.body;
// 		connection.query(updateSection, [formData, req.params.idsection], (err, section) => {
// 			if (err) return res.sendStatus(204);
// 			return res.status(201).json(req.body);
// 		});
// 	})
// 	.delete((req, res) => {
// 		const deleteSection = 'DELETE FROM section WHERE idsection = ?';
// 		connection.query(deleteSection, req.params.idsection, (err, section) => {
// 			if (err) return res.sendStatus(204);
// 			return res.status(200).json({deleted : req.params.idsection});
// 		});
// 	});

module.exports = Router;
