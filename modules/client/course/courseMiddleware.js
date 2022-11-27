'use strict';
const courseService = require('../course/courseService');
const courseMiddlewares = {};

courseMiddlewares.validateCourseExists = async (req, res, next) => {
  try {
    const { courseIds } = req.body;

    const query = {
      where: {
        id: {
          [Op.in]: courseIds,
        },
      },
      raw: true,
    };
    const availableCourses = await courseService.getCourses(query);
    const availableCoursesIds = availableCourses.map((c) => c.id);
    const courseIdsNotAvailable = courseIds.filter((id) => !availableCoursesIds.includes(id));

    if (!utils.isEmpty(courseIdsNotAvailable)) {
      return res.status(400).json({
        msg: 'course id not found',
        status: false,
        data: courseIdsNotAvailable,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'something went wrong',
      status: false,
    });
  }
};

module.exports = courseMiddlewares;
