'use strict';

const studentService = require('../student/studentService');
const utils = require('../../../helpers/utils');

exports.getEnrolledStudents = async (req, res) => {
  try {
    const enrolledStudents = await studentService.getEnrolledStudents();

    return res.status(200).json({
      msg: 'success',
      data: enrolledStudents,
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
exports.updateStudents = async (req, res) => {
  try {
    const { id } = req.body;
    let student = await studentService.getStudent({ where: { id }, raw: true });
    if (!student) {
      return res.status(400).json({
        msg: 'student not available',
        status: false,
      });
    }
    const status = student.status === 'active' ? 'in-active' : 'active';
    await studentService.updateStudent({ status }, { where: { id } });
    student = await studentService.getStudent({ where: { id }, raw: true });

    return res.status(200).json({
      msg: 'success',
      data: student,
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
