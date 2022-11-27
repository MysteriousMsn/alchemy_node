'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'courses',
      [
        {
          course: 'course one',
          noOfSeatsAvailable: 1,
          createdAt: new Date(),
        },
        {
          course: 'course two',
          noOfSeatsAvailable: 2,
          createdAt: new Date(),
        },
        {
          course: 'course three',
          noOfSeatsAvailable: 3,
          createdAt: new Date(),
        },
        {
          course: 'course four',
          noOfSeatsAvailable: 4,
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});
  },
};
