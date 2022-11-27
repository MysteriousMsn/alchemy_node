'use strict';
const _ = require('lodash');

const jwt = require('../../../helpers/jwt');
const adminService = require('../admin/adminService');
const utils = require('../../../helpers/utils');

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let adminData = {};
    let query = {
      where: {
        email: email,
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'roleId', 'status', 'password'],
    };
    let admin = await adminService.findOne(query);
    adminData = admin.toJSON();
    delete adminData.password;
    if (admin && admin.status !== 'active') {
      return res.status(400).json({
        msg: 'Account not active',
        status: false,
      });
    }
    // const isAuthenticated = await adminModel.authenticate(password, admin.password);
    const isAuthenticated = await utils.compareHash(password, admin.password);
    if (isAuthenticated) {
      adminData.secretToken = jwt.signToken({
        adminId: admin.id,
        email: admin.email,
      });
      return res.status(200).json({
        msg: 'login success',
        data: adminData,
        status: true,
      });
    }
    return res.status(403).json({
      msg: 'email password mismatch',
      data: {},
      status: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong.',
      status: false,
    });
  }
};
