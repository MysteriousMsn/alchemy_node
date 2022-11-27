'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      firstName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      lastName: {
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

    await queryInterface.addConstraint('admins', {
      type: 'foreign key',
      name: 'FK_ADMIN_ROLE_ID',
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
    await queryInterface.removeConstraint('admins', 'FK_ADMIN_ROLE_ID');
    await queryInterface.dropTable('admins');
    return true;
  },
};
