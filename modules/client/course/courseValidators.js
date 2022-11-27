'use strict';
const { body } = require('express-validator');
const studentValidators = {};

studentValidators.validateEnroll = () => {
  return [body('courseIds', 'courseIds required').isArray()];
};

module.exports = studentValidators;
