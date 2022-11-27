'use strict';
const _ = require('lodash');

const jwt = require('../../../helpers/jwt');
const studentService = require('../student/studentService');
const courseService = require('../course/courseService');
const utils = require('../../../helpers/utils');
const e = require('express');

exports.enroll = async (req, res) => {
  try {
    const {
      userTokenData: { userId },
      body: { courseIds },
    } = req;

    const courseQuery = {
      where: {
        id: {
          [Op.in]: courseIds,
        },
      },
      raw: true,
    };
    let courses = await courseService.getCourses(courseQuery);
    const seatsNotAvailable = courses.filter((c) => !c.noOfSeatsAvailable);
    if (seatsNotAvailable && seatsNotAvailable.length) {
      return res.status(404).json({
        msg: 'seat not available',
        data: seatsNotAvailable,
        status: false,
      });
    }
    const studentCourseQuery = {
      where: {
        courseId: {
          [Op.in]: courseIds,
        },
        studentId: userId,
      },
      raw: true,
    };
    let studentEnrolledCourses = await courseService.getStudentCoursesByIds(studentCourseQuery);
    studentEnrolledCourses = studentEnrolledCourses.map((c) => c.courseId);
    if (studentEnrolledCourses && studentEnrolledCourses.length) {
      return res.status(500).json({
        msg: 'already enrolled on courses',
        data: studentEnrolledCourses,
        status: false,
      });
    }
    const studentCourses = courseIds.map((courseId) => {
      return { courseId, studentId: userId, enrolledOn: Date.now() };
    });

    const enrolledCourses = await studentService.createBulkCourses(studentCourses, {});
    for (let e of enrolledCourses) {
      const noOfEnrolledCourse = await courseService.getStudentCoursesCount({
        courseId: e.courseId,
      });
      const course = await courseService.getCourse({
        where: { id: e.courseId },
        raw: true,
      });

      const noOfSeatsAvailable = course.noOfSeatsAvailable - noOfEnrolledCourse;
      await courseService.updateCourse({ noOfSeatsAvailable }, { where: { id: e.courseId } });
    }

    return res.status(200).json({
      msg: 'enrolled successfully',
      data: enrolledCourses,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong.',
      status: false,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    let { email, fullName, address, password, phone } = req.body;

    let userData = {
      email,
      fullName,
      address,
      password,
      phone,
      roleId: 4,
    };

    let user = await studentService.createStudent(userData);

    const userPayload = user.toJSON();
    userPayload.secretToken = jwt.signToken({
      userId: user.id,
      email: user.email,
    });
    return res.status(200).json({
      msg: 'login success',
      data: userPayload,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'something went wrong',
      status: false,
    });
  }
};
