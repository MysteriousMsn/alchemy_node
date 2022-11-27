'use strict';

module.exports = (sequelize, DataTypes) => {
  const studentCourses = sequelize.define(
    'student_courses',
    {
      studentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      enrolledOn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['in-active', 'active', 'deleted'],
        defaultValue: 'active',
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  );

  studentCourses.associate = (models) => {
    studentCourses.belongsTo(models.courses, { foreignKey: 'courseId' });
    models.courses.hasMany(models.student_courses, { foreignKey: 'courseId' });
  };

  return studentCourses;
};
