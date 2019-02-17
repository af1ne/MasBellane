/*global process*/
const express = require('express');
const morgan = require('morgan'); // Support HTTP request logger middleware
const bodyParser = require('body-parser'); // Body parsing middleware
const cors = require('cors'); // Providing a Connect/Express middleware
const shell = require('shelljs');
require('dotenv').config();

const index = require('./api/index.js');

const app = express();

app.use(morgan('dev'));

app.use(cors());

//  permet d'utiliser "req.body" dans "./routes/xxx.js"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', index);

app.get('/api', (req, res) => {
	res.send('Bienvenue sur le serveur du Mas Bellane');
});

app.use('/public', express.static('public'));

// Ecoute du serveur sur le port définit dans le fichier ".env"
// ou sur le port 3000 par défaut.
const server = app.listen(process.env.PORT || 3000, () => {
	shell.echo(`✔️  Serveur start with success and running at http://${process.env.HOSTNAME}:${server.address().port}/api`);
});


