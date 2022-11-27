'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      fullName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER.UNSIGNED,
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

    await queryInterface.addConstraint('users', {
      type: 'foreign key',
      name: 'FK_USER_ROLE_ID',
      fields: ['roleId'],
      references: {
        table: 'roles',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
    return true;
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeConstraint('users', 'FK_USER_ROLE_ID');
    await queryInterface.dropTable('users');
    return true;
  },
};
