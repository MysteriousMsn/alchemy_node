'use strict';
const { body } = require('express-validator');
const adminValidators = {};

adminValidators.validateSignIn = () => {
  return [
    body('email', 'email required').exists().isString(),
    body('email', 'should be valid email').isEmail(),
    body('password', 'password required').exists().isString(),
  ];
};

module.exports = adminValidators;
