'use strict';

module.exports = (sequelize, DataTypes) => {
  const courses = sequelize.define(
    'courses',
    {
      course: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      noOfSeatsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  );

  courses.associate = (models) => {};

  return courses;
};
