'use strict';
const express = require('express');
const router = express.Router();

router.use('/client', require('./modules/client'));
router.use('/cms', require('./modules/cms'));

module.exports = router;
