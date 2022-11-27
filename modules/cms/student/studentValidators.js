'use strict';
const { body } = require('express-validator');
const studentValidators = {};

studentValidators.validateSignIn = () => {
  return [
    body('email', 'email required').exists().isString(),
    body('email', 'should be valid email').isEmail(),
    body('password', 'password required').exists().isString(),
  ];
};

module.exports = studentValidators;
