const express = require('express');

// appel des différentes routes
const admin = require('./admin/admin.js');

const Router = express.Router();

Router.use('/admin', admin);

module.exports = Router;
