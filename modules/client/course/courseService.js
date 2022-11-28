'use strict';
const {
  models: { courses: coursesModel, student_courses: studentCoursesModel },
} = global;
const courseService = {};

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

module.exports = courseService;
