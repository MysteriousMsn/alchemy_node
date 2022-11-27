'use strict';
const utils = require('../../helpers/utils');
const jwt = require('../../helpers/jwt');
const { validationResult } = require('express-validator');
const commonService = require('./commonService');
const moment = require('moment');

const commonRootMiddlewares = {};

commonRootMiddlewares.isAdminAuthenticated = async (request, response, next) => {
  try {
    let token = request.headers['authorization'];
    const adminData = jwt.verifyToken(token);
    let admin;
    if (adminData && adminData.adminId) {
      admin = await commonService.findOneAdmin({ where: { id: adminData.adminId } });
    }
    if (utils.isEmpty(adminData) || utils.isEmpty(admin)) {
      return response.status(401).send({
        status: false,
        message: 'You are not authorized',
      });
    }

    request.adminTokenData = adminData;
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      status: false,
      message: 'server error',
    });
  }
};

commonRootMiddlewares.isUserAuthenticated = async (request, response, next) => {
  try {
    let token = request.headers['authorization'];

    const userData = jwt.verifyToken(token);
    let user;

    if (userData === 'TokenExpiredError') {
      return response.status(401).send({
        status: false,
        message: 'You are not authorized',
        errorType: userData,
      });
    }

    if (userData && userData.userId) {
      user = await commonService.findOneUser({
        where: { id: userData.userId },
        attributes: ['id', 'email', 'fullName', 'phone', 'roleId', 'status', 'address'],
      });
    }

    if (utils.isEmpty(userData) || utils.isEmpty(user)) {
      return response.status(401).send({
        status: false,
        message: 'You are not authorized',
      });
    }

    request.userTokenData = userData;
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      status: false,
      message: 'server error',
    });
  }
};

commonRootMiddlewares.validationResultHandler = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({
      msg: (errors.array()[0] && errors.array()[0].msg) || '',
      value: (errors.array()[0] && errors.array()[0].value) || '',
      param: (errors.array()[0] && errors.array()[0].param) || '',
      location: (errors.array()[0] && errors.array()[0].location) || '',
    });
  }

  next();
};

module.exports = commonRootMiddlewares;
