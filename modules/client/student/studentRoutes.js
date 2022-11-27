'use strict';
const express = require('express');
const studentRoute = express.Router();
const { signIn, signUp } = require('../student/studentController');
const studentValidators = require('../student/studentValidators');
const commonRootMiddlewares = require('../../common/commonMiddlewares');
const studentMiddleware = require('../student/studentMiddleware');

const signupMiddlewares = [
  studentValidators.validateSignUp(),
  commonRootMiddlewares.validationResultHandler,
  studentMiddleware.validateStudentNotExists,
  signUp,
];
studentRoute.post('/signup', signupMiddlewares);

const signinMiddleware = [
  studentValidators.validateSignIn(),
  commonRootMiddlewares.validationResultHandler,
  studentMiddleware.validateStudentExists,
  signIn,
];
studentRoute.post('/login', signinMiddleware);

module.exports = studentRoute;
