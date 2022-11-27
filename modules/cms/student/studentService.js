'use strict';
const {
  models: { student_courses: studentCoursesModel, users: usersModel },
} = global;
const studentService = {};

studentService.getEnrolledStudents = (query = {}) => {
  return studentCoursesModel.findAll({
    where: {
      ...query,
    },
  });
};
studentService.getStudent = (query) => {
  return usersModel.findOne({
    query,
  });
};
studentService.updateStudent = (data, query) => {
  return usersModel.update(data, query);
};

module.exports = studentService;
