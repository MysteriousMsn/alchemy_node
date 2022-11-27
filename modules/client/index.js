'use strict';
const express = require('express');
const cmsRoute = express.Router();

cmsRoute.use('/student', require('./student/studentRoutes'));
cmsRoute.use('/course', require('./course/courseRoutes'));

module.exports = cmsRoute;
