'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin', 'principle', 'teacher', 'student'],
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
    return true;
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('roles');
    return true;
  },
};
