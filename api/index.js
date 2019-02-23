const express = require('express');
const Router = express.Router();

// appel des différentes routes
const admin = require('./admin/admin');
const section = require('./sections/sections');
const room = require('./rooms/room');
const season = require ('./season/season');

Router.use('/admin', admin);
Router.use('/section', section);
Router.use('/room', room);
Router.use('/season', season);

module.exports = Router;
