'use strict';
const express = require('express');
const courseRoute = express.Router();
const { enroll } = require('../course/courseController');
const courseValidators = require('../course/courseValidators');
const commonRootMiddlewares = require('../../common/commonMiddlewares');
const courseMiddleware = require('../course/courseMiddleware');

const enrollMiddlewares = [
  commonRootMiddlewares.isUserAuthenticated,
  courseValidators.validateEnroll(),
  commonRootMiddlewares.validationResultHandler,
  courseMiddleware.validateCourseExists,
  enroll,
];
courseRoute.post('/enroll', enrollMiddlewares);

module.exports = courseRoute;
