'use strict';
const bcrypt = require('bcrypt');
const fs = require('fs');

const utils = {};

utils.isEmpty = (data) => {
  const emptyDataIdentifiers = [null, 0, '', undefined, 'undefined', false, '0'];
  if (emptyDataIdentifiers.includes(typeof data)) {
    return true;
  }
  if (emptyDataIdentifiers.includes(data)) {
    return true;
  }
  if (typeof data === 'object') {
    const keys = Object.keys(data);
    if (!keys.length) {
      return true;
    }
  }
  return false;
};

utils.createHash = async (data) => {
  const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT_ROUNDS));
  return bcrypt.hash(data, salt);
};

utils.compareHash = async (data, hash) => {
  return bcrypt.compare(data, hash);
};

module.exports = utils;
