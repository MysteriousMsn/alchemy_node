'use strict';
const express = require('express');
const studentRoute = express.Router();
const { getEnrolledStudents, updateStudents } = require('../student/studentController');
const commonRootMiddlewares = require('../../common/commonMiddlewares');

const enrolledStudentMiddleware = [commonRootMiddlewares.isAdminAuthenticated, getEnrolledStudents];
studentRoute.get('/enrolled', enrolledStudentMiddleware);

const updateStudentMiddleware = [commonRootMiddlewares.isAdminAuthenticated, updateStudents];
studentRoute.patch('/update/status', updateStudentMiddleware);

module.exports = studentRoute;
