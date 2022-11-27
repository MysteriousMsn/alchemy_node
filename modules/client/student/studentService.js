'use strict';
const {
  models: { users: userModel, student_courses: studentCoursesModel },
} = global;
const studentService = {};

studentService.findOne = (query) => {
  return userModel.findOne(query);
};

studentService.createStudent = (data) => {
  return userModel.create(data);
};
studentService.createBulkCourses = (data, options) => {
  return studentCoursesModel.bulkCreate(data, options);
};
studentService.findAdminByEmail = (email) => {
  let query = {
    where: {
      email: email,
    },
  };
  return adminModel.findOne(query);
};
studentService.createProgram = (data) => {
  return programLibraryModel.create(data);
};

studentService.getAllPrograms = (query) => {
  return programLibraryModel.findAll(query);
};

studentService.updatePassword = (data, query) => {
  return adminModel.update(data, query);
};

module.exports = studentService;
