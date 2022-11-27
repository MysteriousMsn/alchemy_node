'use strict';
const jsonwebtoken = require('jsonwebtoken');
const jwt = {};

jwt.signToken = (data, expiresIn = null) => {
  return jsonwebtoken.sign(data, process.env.JWT_SECRET, {
    expiresIn: expiresIn ? expiresIn : '1d',
  });
};

jwt.verifyToken = (token) => {
  let decoded = {};
  if (token) {
    try {
      decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET, {});
    } catch (err) {
      decoded = err.name;
      console.log(err.message);
    }
  }
  return decoded;
};

jwt.decodeToken = (token) => {
  let decoded = {};
  if (token) {
    try {
      decoded = jsonwebtoken.decode(token);
    } catch (err) {
      console.log(err);
    }
  }
  return decoded;
};

module.exports = jwt;
