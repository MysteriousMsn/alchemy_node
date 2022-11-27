'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          role: 'admin',
          createdAt: new Date(),
        },
        {
          role: 'principle',
          createdAt: new Date(),
        },
        {
          role: 'teacher',
          createdAt: new Date(),
        },
        {
          role: 'student',
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
