'use strict';
const express = require('express');
const adminRoute = express.Router();
const { signIn } = require('../admin/adminController');
const adminValidators = require('../admin/adminValidators');
const commonRootMiddlewares = require('../../common/commonMiddlewares');
const adminMiddleware = require('../admin/adminMiddleware');

const signinMiddleware = [
  adminValidators.validateSignIn(),
  commonRootMiddlewares.validationResultHandler,
  adminMiddleware.validateAdminExists,
  signIn,
];
adminRoute.post('/login', signinMiddleware);

module.exports = adminRoute;
