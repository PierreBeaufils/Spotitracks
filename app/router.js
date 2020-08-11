const express = require('express');
const router = express.Router();

const mainController = require('./mainController');




router.get('/', mainController.home);
router.get('/login', mainController.login);
router.get('/callback', mainController.callback);
router.get('/artists/top', mainController.topArtists);
router.get('/tracks/top', mainController.topTracks);
router.get('/logout', mainController.logout);



module.exports = router;