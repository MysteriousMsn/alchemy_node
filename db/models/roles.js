'use strict';

module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define(
    'roles',
    {
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'principle', 'teacher', 'student'],
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  );

  roles.associate = (models) => {};

  return roles;
};
