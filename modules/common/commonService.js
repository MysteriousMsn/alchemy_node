'use strict';
const {
    models: { admins: adminModel, users: usersModel },
} = global;
const commonService = {};

commonService.findOneAdmin = (query) => {
    return adminModel.findOne(query);
};

commonService.findOneUser = (query) => {
    return usersModel.findOne(query);
};

commonService.updateUser = (data, query) => {
    return usersModel.update(data, query);
};

module.exports = commonService;