const express = require('express');
const Router = express.Router();

// appel des différentes routes
const admin = require('./admin/admin');
const sections = require('./sections/sections');
const rooms = require('./rooms/rooms');
const annex = require('./rooms/annex');
const seasons = require ('./season/season');

Router.use('/admin', admin);
Router.use('/sections', sections);
Router.use('/rooms', rooms);
Router.use('/annex', annex);
Router.use('/seasons', seasons);

module.exports = Router;
