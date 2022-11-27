'use strict';
const {
  models: { courses: coursesModel, student_courses: studentCoursesModel },
} = global;
const courseService = {};

courseService.findOne = (query) => {
  return userModel.findOne(query);
};
courseService.getCourse = (query) => {
  return coursesModel.findOne(query);
};
courseService.getCourses = (query) => {
  return coursesModel.findAll(query);
};
courseService.updateCourse = async (data, query) => {
  return coursesModel.update(data, query);
};
courseService.getStudentCoursesCount = (query) => {
  return studentCoursesModel.count({ where: query });
};
courseService.getStudentCoursesByIds = (query) => {
  return studentCoursesModel.findAll(query);
};
courseService.createStudent = (data) => {
  return userModel.create(data);
};

courseService.findAdminByEmail = (email) => {
  let query = {
    where: {
      email: email,
    },
  };
  return adminModel.findOne(query);
};
courseService.createProgram = (data) => {
  return programLibraryModel.create(data);
};

courseService.getAllPrograms = (query) => {
  return programLibraryModel.findAll(query);
};

courseService.updatePassword = (data, query) => {
  return adminModel.update(data, query);
};

module.exports = courseService;
