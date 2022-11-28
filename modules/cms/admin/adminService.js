'use strict';
const {
  models: { admins: adminModel },
} = global;
const adminService = {};

adminService.findOne = (query) => {
  return adminModel.findOne(query);
};

module.exports = adminService;
