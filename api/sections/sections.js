const express = require('express');
const connection = require('../../config/environements/developement/database');
const Router = express.Router();

Router
	.route('/')

	.get((req, res) => {
		// SELECTION section + galerie
		const getAllSection = 'SELECT `section`.*, `galerie`.* FROM`section` LEFT JOIN`section_has_galerie` ON`section_has_galerie`.`section_idsection` = `section`.`idsection` LEFT JOIN`galerie` ON`section_has_galerie`.`galerie_idgalerie` = `galerie`.`idgalerie`';
    
		// SELECTION section + galerie + pictures
		// const sql = 'SELECT `section`.*, `section_has_galerie`.*, `galerie`.*, `galerie_has_picture`.*, `picture`.* FROM `section` LEFT JOIN `section_has_galerie` ON `section_has_galerie`.`section_idsection` = `section`.`idsection` LEFT JOIN `galerie` ON `section_has_galerie`.`galerie_idgalerie` = `galerie`.`idgalerie` LEFT JOIN `galerie_has_picture` ON `galerie_has_picture`.`galerie_idgalerie` = `galerie`.`idgalerie` LEFT JOIN `picture` ON `galerie_has_picture`.`picture_idpicture` = `picture`.`idpicture`';
    
		connection.query(getAllSection, (err, result) => {
			if (err) throw err;
			return res.status(200).send(result);
		});
	})

	.post((req, res) => {
		const postNewSection = 'INSERT INTO `section`(`name`, `title`, `subtitle`, `content`, `textButton`, `backgroundColor`) VALUES (?, ?, ?, ?, ?, ?)';
		const values = [
			req.body.name,
			req.body.title,
			req.body.subtitle,
			req.body.content,
			req.body.textButton,
			req.body.backgroundColor
		];
		connection.query(postNewSection, values, (err, result) => {
			if (err) throw err;
			// const sqlRelation = 'INSERT INTO `section_has_galerie`(`section_idsection`, `galerie_idgalerie`) VALUES (LAST_INSERT_ID(), ?)';
			// const idGalerie = req.body.idgalerie;
			// connection.query(sqlRelation, idGalerie, (error, resultRelation) => {
			// 	if (error) throw error;
			// 	return res.status(201).send(resultRelation);
			// });
			return res.status(201).send(result);
		});
	});
  
Router
	.route('/:idsection(\\d{2,})')
	.get((req, res) => {
		const getSection = 'SELECT `section`.*, `galerie`.* FROM`section` LEFT JOIN`section_has_galerie` ON`section_has_galerie`.`section_idsection` = `section`.`idsection` LEFT JOIN`galerie` ON`section_has_galerie`.`galerie_idgalerie` = `galerie`.`idgalerie` WHERE section.idsection = ?';
		connection.query(getSection, req.params.idsection, (err, section) => {
			if (err) return res.sendStatus(204);
			return res.status(200).json(section[0]);
		});
	})
	.put((req, res) => {
		const updateSection = 'UPDATE section SET ? WHERE idsection = ?';
		const formData = req.body;
		connection.query(updateSection, [formData, req.params.idsection], (err, section) => {
			if (err) return res.sendStatus(204);
			return res.status(201).json(req.body);
		});
	})
	.delete((req, res) => {
		const deleteSection = 'DELETE FROM section WHERE idsection = ?';
		connection.query(deleteSection, req.params.idsection, (err, section) => {
			if (err) return res.sendStatus(204);
			return res.status(200).json({deleted : req.params.idsection});
		});
	});

module.exports = Router;
