'use strict';
const express = require('express');
const cmsRoute = express.Router();

cmsRoute.use('/admin', require('./admin/adminRoutes'));
cmsRoute.use('/student', require('./student/studentRoutes'));

module.exports = cmsRoute;
