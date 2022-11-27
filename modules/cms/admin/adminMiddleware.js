'use strict';
const adminService = require('../admin/adminService');
const adminMiddleware = {};

adminMiddleware.validateAdminExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    let query = {
      where: {
        email: email,
      },
    };
    let admin = await adminService.findOne(query);
    if (utils.isEmpty(admin)) {
      return res.status(400).json({
        msg: 'invalid email',
        status: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'unprocessible entry',
    });
  }
};

module.exports = adminMiddleware;
