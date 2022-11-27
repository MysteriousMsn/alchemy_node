'use strict';
const studentService = require('../student/studentService');
const userMiddlewares = {};

userMiddlewares.validateStudentExists = async (req, res, next) => {
  try {
    let { email } = req.body;
    let query = { where: { email, roleId: 4 } };
    const user = await studentService.findOne(query);
    if (utils.isEmpty(user)) {
      return res.status(400).json({
        msg: 'email does not exist',
        status: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'something went wrong',
      status: false,
    });
  }
};
userMiddlewares.validateStudentNotExists = async (req, res, next) => {
  try {
    let { email } = req.body;
    let query = { where: { email, roleId: 4 } };
    const user = await studentService.findOne(query);
    if (!utils.isEmpty(user)) {
      return res.status(400).json({
        msg: 'email exist',
        status: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'something went wrong',
      status: false,
    });
  }
};

module.exports = userMiddlewares;
