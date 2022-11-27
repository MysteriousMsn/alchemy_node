'use strict';
const _ = require('lodash');

const jwt = require('../../../helpers/jwt');
const studentService = require('../student/studentService');
const utils = require('../../../helpers/utils');

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let query = {
      where: {
        email: email,
      },
      attributes: [
        'id',
        'fullName',
        'address',
        'email',
        'phone',
        'status',
        'roleId',
        'status',
        'password',
      ],
    };
    let student = await studentService.findOne(query);
    let studentData = student.toJSON();
    if (student && student.status !== 'active') {
      return res.status(400).json({
        msg: 'Account not active',
        status: false,
      });
    }
    // const isAuthenticated = await adminModel.authenticate(password, admin.password);
    const isAuthenticated = await utils.compareHash(password, student.password);
    if (isAuthenticated) {
      studentData.secretToken = jwt.signToken({
        userId: student.id,
        email: student.email,
      });
      return res.status(200).json({
        msg: 'login success',
        data: studentData,
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

exports.signUp = async (req, res) => {
  try {
    let { email, fullName, address, password, phone } = req.body;

    let userData = {
      email,
      fullName,
      address,
      password,
      phone,
      roleId: 4,
    };

    let user = await studentService.createStudent(userData);

    const userPayload = user.toJSON();
    userPayload.secretToken = jwt.signToken({
      userId: user.id,
      email: user.email,
    });
    return res.status(200).json({
      msg: 'login success',
      data: userPayload,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'something went wrong',
      status: false,
    });
  }
};
