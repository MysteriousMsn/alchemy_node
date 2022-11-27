'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      studentId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      courseId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      enrolledOn: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['in-active', 'active', 'deleted'],
        defaultValue: 'active',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('student_courses', {
      type: 'foreign key',
      name: 'FK_STUDENT_ID',
      fields: ['studentId'],
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
    return true;
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeConstraint('student_courses', 'FK_STUDENT_ID');
    await queryInterface.dropTable('student_courses');
    return true;
  },
};
