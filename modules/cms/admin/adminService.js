'use strict';
const {
    models: {
        admins: adminModel,
        roles: rolesModel,
        program_library: programLibraryModel,
        program_reviews: programReviewModel,
    },
} = global;
const adminService = {};

adminService.findOne = (query) => {
    return adminModel.findOne(query);
};

adminService.findAdminByEmail = (email) => {
    let query = {
        where: {
            email: email,
        },
    };
    return adminModel.findOne(query);
};
adminService.createProgram = (data) => {
    return programLibraryModel.create(data);
};

adminService.getAllPrograms = (query) => {
    return programLibraryModel.findAll(query);
};

adminService.addReviews = (data) => {
    return programReviewModel.create(data);
};

adminService.updatePassword = (data, query) => {
    return adminModel.update(data, query);
};

module.exports = adminService;