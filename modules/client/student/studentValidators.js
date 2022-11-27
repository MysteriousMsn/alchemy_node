'use strict';
const { body } = require('express-validator');
const studentValidators = {};

studentValidators.validateSignUp = () => {
  return [
    body('email', 'email required').exists().isString(),
    body('email', 'should be valid email').isEmail(),
    body('password', 'password required').exists().isString(),
    body('fullName', 'full name required').exists().isString(),
    body('address', 'address required').exists().isString(),
    body('phone', 'phone required').exists().isString(),
  ];
};
studentValidators.validateSignIn = () => {
  return [
    body('email', 'email required').exists().isString(),
    body('email', 'should be valid email').isEmail(),
    body('password', 'password required').exists().isString(),
  ];
};

module.exports = studentValidators;
