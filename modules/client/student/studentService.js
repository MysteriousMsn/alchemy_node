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

module.exports = studentService;
